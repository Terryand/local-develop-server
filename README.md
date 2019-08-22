## 为静态页面开发提供本地服务器，作为开发环境

#### 提供如下功能
* 服务器端代理
* 跨目录文件访问
* 日常开发工具

#### 使用方式

```bash
node index.js --port={应用监听端口} --proxypath={需要代理的请求前缀} --proxytarget={代理指向目标} --staticspath={地址全路径，注意区分 windows 系统和类 unix 系统 } --mode={1,2,3}
```
