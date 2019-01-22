# 私有 NPM 仓库

私有仓库

## 仓库详情

<div class="ant-table">
<table class="downloads">
  <tbody>
    <tr>
      <td class="count" id="total-packages"></td><td> 个模块</td>
      <td class="count" id="total-versions"></td><td> 个模块版本</td>
      <td class="count" id="total-deletes"></td><td> 次删除</td>
    </tr>
    <tr>
      <td class="count"></td><td> 次本日下载</td>
      <td class="count"></td><td> 次本周下载</td>
      <td class="count"></td><td> 次本月下载</td>
    </tr>
    <tr>
      <td class="count"></td><td> 次昨日下载</td>
      <td class="count"></td><td> 次上周下载</td>
      <td class="count"></td><td> 次上月下载</td>
    </tr>
  </tbody>
</table>
</div>

<script src="/js/readme.js"></script>

## 使用说明

### npm 环境配置

1、推荐方案：安装 nrm 包:(nrm是用来快速切换仓库源)

```bash

1.先全局安装nrm
npm install nrm -g

2.再添加npm源 
nrm add lnpm http://47.99.219.124 
这里的lnpm可以自定义，可以使用nrm ls查看是否安装成功

3.切换仓库源
nrm use lnpm 
```

2、方案二：将npm registry 指向npm私有仓库

```bash
$ npm config set registry http://47.99.219.124
```




### 安装模块

1、第三方模块安装

```bash
$ npm install [module-name]
```

2、公司私有模块安装，npm install 私有前缀/模块名。 (目前私有前缀有 @lp @lp-test)

```bash
$ npm install [@lp/module-name]
```

### 发布模块

1、登录 npm 

```bash
$ unpm login
Username: name
Password: ***
Email: (this IS public) name@uyunsoft.cn 
```

2、创建测试模块

```bash
$ cd /tmp
$ mkdir helloworld && cd helloworld
$ npm init
name: @lp/helloworld
version: 1.0.0
```
 生成package.json :

 ```bash
{
  "name": "@uyun/helloworld",
  "version": "1.0.0",
  "description": "my first scoped package",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
注意，包名 helloworld 前必须要加私有仓库前缀 @lp 或 @lp-test

3、发布

 ```bash
 npm publish
 ```
