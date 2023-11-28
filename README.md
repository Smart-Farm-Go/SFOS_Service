## 服务端(SFOS_Service)

SFOS_Service 是 SFOS 的 API 服务端，并不提供 UI 交互。

### commands 工具

commands 工具将为 Smart Farm OS 提供命令行工具。
用于程序配置，用户控制，程序监控等，辅助命令行工具。

> 命令行工具使用 `Nest` + `Commands` ，如果你更改了命令行工具的代码将需要重新打包。

###### 打包

``` bash
# 打包
npm run build cli
```

###### 运行

``` bash
# 运行
node ./dist/apps/cli help
```
