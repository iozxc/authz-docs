# 介绍

[[toc]]

## 什么是Authz

Authz （Authorization **授权**） 是一套**权限安全框架**，同时支持设备管理。它简化了配置，有简洁的sdk，内部实现了一套<span style='color: #ce7171'>双层同步缓存</span>，在性能上表现出色。支持微服务、支持<span style='color: #ce7171'>RBAC的权限验证</span>、支持<span style='color: #ce7171'>API权限</span>、<span style='color: #ce7171'>API参数权限</span>、<span style='color: #ce7171'>数据权限</span>、<span style='color: #ce7171'>字段权限</span>、方法权限等权限管理。有用户设备的登录 & 退出 & 封禁 & 登录数量限制 & 查看在线人数等，ip限制，网段限制 & RateLimit 等功能。与此同时支持<span style='color: #ce7171'>动态权限</span>，且自带Dashboard（可以在Dashboard里动态的修改API、参数权限等权限和一些设备、黑名单操作）。

### 简图

![简图](/authz-preview.jpg)


## 快速开始

::: details 项目信息 & 版本查询
<a style="width: unset; height: unset; display: inline-block; margin-right: 10px;" href="https://github.com/iozxc/authz-spring-boot-starter" target="_blank"><img alt="Version" src="https://img.shields.io/static/v1?label=version&labelColor=f2f2f2&message=1.2.10&color=ec8c47&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAqUExURUdwTD9FS5xaTf1vTj9FSz9ESz9FSz9FS/1xTj9FS/1wTvxvTT9FS/xwTtfb/sUAAAAMdFJOUwC7HlaOQGfUiuyyNAVxKzgAAATvSURBVHja7Zu/S5tBGMffvOZNtCqUUu2SIVXbLi0Epy6CLWgRMiRFByGDFVEKDlrEKUOhSykIDtopQ8dCCXQuFIxEXwI3lLoES/6Xivom73u5u+e5X7bCfUe9N5+757733Jvcc57n5OTk5OT0L+Tn7SNe1Fr3LWOCBXKhZskmI5Mjl2qs2GM8rpJrhau2GIs10lVrzg6jTBIas8F4QyiNGzeZ/4r06cAwJSgShsxaObIuLZNW7lmXVvjShnVpmbJymQg1bsW6tHbzNqzbZ+WSDev2maxkw7omrcy07ue3Rq3MtO44xwpzBq17+VmLxqzM6m/rOipTNSNWZlo37M5vpmrAykzrxp0a5LRNxrRuMxEOn9mNVU3r7tKtNrTyJdO6YzL2U7Quc7FNKVuZaV3OjGZYY95RGwc/ATJNBr4ssfrWFKwypslmAQjjmQPxEwuMXomfSCOsi7CyeCib8gFmTeOpMJv02WoWY8h030SKsliKmxEBu9Ap4q6gcUV176atfIL2VlNig6Cs3MROya7c7rCBnJSM1pechMlWUKtE4fVjCrVSUmBGROckvr2yCFv5zz/kESbb4rYZiRj8jxmudzrn3/ldiChHMIQfkb3Ohdr8/5uADHQuVbAKeXYF+W0VsncFaVuF1K8g5zYhfudaeYuQgQhScBAHcRAHcRAHcRAHcZBbCZmIaTKCTMf/qg0ZqHdAtQt6kGEEI/HVSwUy00HpTAfid5DKa0AGsZD3GpBRLOSXBmQGCznTgOxhIW0NSB0LOf/fw/UTC/mjAbmDhXzRgAxgIQWdtFKXNJcSZFBywaul+h8YxjfdTWvyY0yfoo/9Gv/rtNvjbzlkKDpsUIdExw/74O/CBiBbIKSlDqmBkJQ5yF34t3p1CPxbfffUIa8K8eFThzR0xAJCAhiSgY5YQEgGPqQB+wFC0vBxkw+dfoCQLDSrMW8cqUJGIH/G1uuJKqQC5YxYemuqQorwMU+3TagKqSIOyyuAOSBIgDmWHQI8DEG6Dt4XQFKAhyFIFnOKnQFO7SHIJrzgY6uxoQbJIdYi2AqAQH2kPMyZeQCSxpV7PI2aHbK7Kj44W46ePhZCoL6IjwCLuJKSACgNEB5mQg/3zzzb6aPU13b2KhPPe8zpp6KZL6g8y0gsLUG8ONGqYZJKYuY58RIc+qfQVVF+FRgzv3yhG60w72EnpVXypNSL1inYNouqBxJGawts2yuQachBcgSTgqkdFJ4/jmNCROtNgo+t8mNpgs0O7JSCCkDPxDJD6Q0ENnDilQU1hbRdhC8qzHg1sZAikbVLTvqJWL+wxl+WHkpsIIfyASb3MA88JArTGCu5DBE2DqpEwZBpIhWwIiEqWSInU+AXL+iTyXdPwKLnnhLlz++U9gawdjRRMSq3B1WwFarJqtQTGQZV28mnUJWvkptpBUWhGHID6ascZt/6o4v8JQcSe/Xm3pTz6eL4Y09adJ1xYz6B8dfoaveGPINRMx7Od+MRrFWlC93BbBFpe359aWl97QGRrnPn2bNGZLSiBIHusxm6qFnEM5qqjMRGIVZYUoYwqvI5Fw5nPQ0t4iCalxrLVic90gbM2PW0BV6aNHI1s2w5VtezfwMXWS/2De7dyYbB2+UB56bpTskzqUXGYBrmr6/TmIadG/KPevvI9vxrz578iaWlibzn5OTk5OR08/oLEN67hDDsfqoAAAAASUVORK5CYII="></a>
<a style="width: unset; height: unset; display: inline-block; margin-right: 10px;" href="https://github.com/iozxc/authz-spring-boot-starter" target="_blank"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/iozxc/authz-spring-boot-starter?color=e5c463&labelColor=f2f2f2"></a>
<a style="width: unset; height: unset; display: inline-block; margin-right: 10px;" href="https://github.com/iozxc/authz-spring-boot-starter/blob/master/LICENSE" target="_blank"><img alt="License" src="https://img.shields.io/github/license/iozxc/authz-spring-boot-starter?labelColor=f2f2f2"></a>

[在maven中心仓库查询](https://search.maven.org/search?q=authz-spring-boot-starter)

[在github中查询](https://github.com/iozxc/authz-spring-boot-starter)
:::

### Maven

```xml
<dependency>
  <groupId>cn.omisheep</groupId>
  <artifactId>authz-spring-boot-starter</artifactId>
  <version>LATEST</version> 
</dependency>
```

### 基础配置

#### 单机版本

```yaml
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
```

#### 启用了redis（微服务）

```yaml
spring:
  redis:
    host: localhost
    port: 6389
    password: authz
    
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  cache:
    enable-redis: true
```



### 登录

在需要登录的地方调用方法：

```java{4}
public boolean login(String username, String password) {
  // 自定义认证方式
  if ("authz".equals(username) && "authz".equals(password)){
    AuHelper.login(1); // 用户id为1，此id全局唯一
    return true;
  } else {
    return false;
  }
}
```

### 登录验证

```java{2}
// 在需要验证登录的方法上加上 @AuthRequireLogin
@AuthRequireLogin //注意只在web环境有效，也就是每次请求之后调用此方法
public String checkLogin() {
  System.out.println("ok"); // 某请求调用此方法，若此次请求未登录，那么将不会打印 ok 且会返回错误json
}
```

以上只是最简单的使用方法，需要判断登录的地方很多，所以也支持注解直接标记Controller或者Spring的Component

```java{3}
// 支持注解直接标记Controller或者Spring的Component
@Service
@AuthRequireLogin
public class Service  {
  public String ok() {
  	System.out.println("ok"); // 某请求调用此方法，若此次请求未登录，那么将不会打印 ok 且会返回错误json
	}
}
```



::: info 补充

当然大多情况只需要<span style='color: #ce7171'>登录判断</span>，但是某些系统也需要<span style='color: #ce7171'>权限判断</span>，所以会和@Roles或者@Auth等权限注解一起使用（后续会介绍）。而不是单纯的使用`@AuthRequireLogin`。所以下面将会逐一详细的介绍这些功能和使用方法。

:::
