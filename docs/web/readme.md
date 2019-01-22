# 优云 NPM 仓库

公司私有仓库，目前只支持内网访问

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

### unpm 环境配置

1、推荐方案：安装 unpm 命令行工具

```bash
$ npm install @uyun/unpm -g --registry=http://http://47.99.219.124
```

2、方案二：将npm registry 指向我们内部npm仓库

```bash
$ npm config set registry http://http://47.99.219.124
```

3、方案三：添加 npm 参数 alias 一个新命令 unpm，该方案不会对npm产生影响

```bash
$ alias unpm="npm --registry=http://http://47.99.219.124 \
  --cache=$HOME/.unpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.unpmrc"

# Or alias it in .bashrc or .zshrc

$ echo '\n#alias for unpm\nalias unpm="npm --registry=http://http://47.99.219.124 \
  --cache=$HOME/.unpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.unpmrc"' >> ~/.zshrc && source ~/.zshrc
```


### 安装模块

1、第三方模块安装

```bash
$ unpm install [module-name]
```

2、公司私有模块安装，unpm install 私有前缀/模块名。 (目前私有前缀有 @uyun、@uyundev)

```bash
$ unpm install [@uyun/module-name]
```

### 发布模块

1、登录 unpm (目前没做登录验证，后期考虑对接集团用户体系)

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
$ unpm init
name: @uyun/helloworld
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
注意，包名 helloworld 前必须要加私有仓库前缀 @uyun 或 @uyundev

3、发布

 ```bash
 unpm publish
 ```
