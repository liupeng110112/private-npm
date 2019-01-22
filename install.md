前言
 由于公司需要搭建一套业务组件平台供产品内使用，为了方便管理借助CNPM构建一套公司内部私有的NPM服务。

安装依赖
 我们的系统环境：

Linux：centos7
Node: v8，可以是最新的
MySQL：v5.7 MySQL Community Server (GPL)
域名：可选，内部也可以用IP
 部署安装
 初始化数据库
创建存储私服配置信息的mysql库，并初始化所需要的表。（假设linux服务器已经安装了mysql,如果未安装可以自行搜索）

创建数据库 

create database unpm
   如果存在该数据库则先删掉 

drop database if exits unpm;


导入基础表及数据 

mysql -uroot -p unpm < docs/db.sql
这一步db.sql,需要先下载下面的源码，进入到cnpmjs目录执行

源码安装部署
从仓库中下载源码

git clone https://github.com/cnpm/cnpmjs.org.git -b 2.x
这里需要注意的是cnpm 3.0.0-alpha.3的同步功能有错误，需要下载2.x的版本

下载完之后安装包 

npm i


安装完之后，进入config目录，新建config.js 添加如下示例代码，服务启动的时候默认会合并index.js和config.js里面的配置

var config = {
  enableCluster: true,
  sessionSecret: 'uyun npm session secret',
  database: {
    db: 'unpm', //上面初始化时候的数据名称
    username: 'root', //默认root用户名
    password: '',     // root密码

    dialect: 'mysql', //数据库

    host: '127.0.0.1',  // 默认127.0.0.1

    port: 3306,  // 默认端口

    pool: {
      maxConnections: 10,
      minConnections: 0,
      maxIdleTime: 30000
    }
  },
  registryHost: '127.0.0.1:7001', //npm包注册地址
  npmClientName: 'npm', // use `${name} install package`
  badgeSubject: 'npm',

  syncModel: 'exist', // 同步模式
  // sync devDependencies or not, default is false
  syncDevDependencies: false,

  // registry scopes, if don't set, means do not support scopes
  scopes: [ '@uyun','@uyun-test' ], //npm包作用域
  // default system admins
  admins: {
    liupeng: 'liupeng@uyunsoft.cn'
  }
}

module.exports = config;


相关配置的几个重要参数说明如下：

registryPort ： 仓库注册端口号，默认为7001。
webPort ：web界面访问端口号，默认为7002。
bindingHost ：绑定的服务host，注释掉此配置，针对所有ip可访问。
npmClientName ：UI界面显示的安装提示命令，建议使用自定义的命令，如 lnpm；以便私服无法使用时，还可以使用 npm 或者 cnpm。
database.db ：数据库名称。
database.username ：数据库用户。
database.password ：数据库密码。
database.dialect ：数据库方言。
database.host ：数据库地址。
database.port ：数据库端口号。
database.storage ：数据的存储位置，针对sqlite存储，其它数据库可忽略。
enablePrivate ：私服的模式，和 scopes 配置组合使用，公司内部使用强烈建议 true ，因为cnpm的权限目前做的还不太好，所以为了达到权限的控制，设置成 true ，就可以配置 admin ，仅有 admin 用户才可以往私服上发布模块。具体的组合模式请参考：https://github.com/cnpm/cnpmjs.org/wiki/Different-Modes。
sourceNpmRegistry ：仓库地址，默认为淘宝提供的仓库地址 https://registry.npm.taobao.org ，请勿修改。
syncModel ： 同步模式，默认值为‘none’，不同步任何模块，仅做 sourceNpmRegistry 的代理。建议使用 exist 。






修改index.js 将配置中的 bindingHost 注释掉
进入到项目目录，运行npm start ，成功的话可以看到如下界面,比如当前地址是http://10.1.240.173:7002/刘鹏 > 2018/03/07 > CNPM搭建私有的NPM服务 > image2018-3-7 14:28:27.png
以上就成功搭建了NPM私有服务
私服使用
客户端设置私服
私服搭建成功后，假设仓库地址为 http://10.1.240.173:7001/ ,web地址：http://http://10.1.240.173:7002/。客户端如何才能使用私服,有以下两种方式

 设置 npm 或 cnpm 客户端的配置，将 registry 参数指向仓库地址：

npm config set http://10.1.240.173:7001/
设置成功后，可以使用 npm config list查看

开发自己的 npm 客户端。在cnpm基础上做一个简单的改造即可成为自己私有的客户端 比如unpm，好处是不影响 npm 及 cnpm 客户端的使用，在私有客户端 unpm 不能使用的情况下，可以使用它们来提供基础的服务
假如我们使用第一种方式

开发私有包
搭建了私服，其主要一个目的是可以开发管理自己的私有包。使用npm init初始化一个简单项目，需要修改下name为当前私服作用下 ，如下

{
  "name": "@uyun/test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
开发完之后登录到私服 

npm login
登录之后进行发布

npm publish
卸载刚才发的包

npm unpublish @uyun/test
权限设置
主要是针对发布权限的设置，增加完一个用户后，用户无 cnpm 私服的发布权限，只有在服务器将用户加入到admin 角色时，才有发布/删除的权限. 需要修改上面配置中的admins参数 

 

admins: {
    liupeng: 'liupeng@uyunsoft.cn',
    admin: 'admin@gmail.com'
}


 

参考资料
Mysql安装  https://segmentfault.com/a/1190000010864818
私服搭建 https://blog.zenfery.cc/archives/148.html
linux安装node http://www.cnblogs.com/dubaokun/p/3558848.html
cnpmjs官方文档 https://github.com/cnpm/cnpmjs.org
