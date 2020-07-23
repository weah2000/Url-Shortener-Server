# url_shortener_service

#### 介绍
短链接生成服务端,基于[https://github.com/bradtraversy/url_shortener_service](bradtraversy/url_shortener_service)项目二次开发,nodejs+mongodb技术栈

#### 软件架构
基于Node.js+mongodb
使用JSON格式发送长连接,返回短链接.
原理:数据库建立长连接的短字符串,路由获取短字符串,拿到对应的长连接进行重定向

#### 安装教程
```
npm install
```
#### 使用说明
```
npm start
```
#### 感谢
bradtraversy的原生代码
[https://github.com/bradtraversy/url_shortener_service]