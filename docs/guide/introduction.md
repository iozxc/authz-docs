# 介绍

[[toc]]

## 什么是Authz

Authz （Authorization **授权**） 是一套**权限安全框架**，同时支持设备管理。它简化了配置，有简洁的sdk，内部实现了一套<span style='color: #ce7171'>双层同步缓存</span>，在性能上也表现出色。支持微服务、支持<span style='color: #ce7171'>RBAC的权限验证</span>、支持<span style='color: #ce7171'>API权限</span>、<span style='color: #ce7171'>API参数权限</span>、<span style='color: #ce7171'>数据权限</span>、<span style='color: #ce7171'>字段权限</span>、方法权限等权限管理。有用户设备的登录 & 退出 & 封禁 & 登录数量限制 & 查看在线人数等，ip限制，网段限制 & RateLimit 等功能。与此同时支持<span style='color: #ce7171'>动态权限</span>，且自带Dashboard（可以在Dashboard里动态的修改API、参数权限等权限和一些设备、黑名单操作）。



### 简图

![简图](/authz-preview.jpg)



## 快速开始

### Maven

::: info 版本查询
[在maven中心仓库查询](https://search.maven.org/search?q=authz-spring-boot-starter)

[在github中查询](https://github.com/iozxc/authz-spring-boot-starter)
:::

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

#### 启用了redis

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
    AuHelper.login(1); // 用户id为1，这里的id为全局唯一
    return true;
  } else {
    return false;
  }
}
```

### 登录验证

```java{2}
// 在需要验证登录的方法上加上 @AuthRequireLogin 或者 @Certificated 两者等效
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

<style>
  :root{
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #e7cb7f, #d65454);

    --vp-c-brand: #fb8732;
    --vp-c-brand-light: #fb8732;
    --vp-c-brand-lighter: #ff7727;
    --vp-c-brand-dark: #fb8732;
    --vp-c-brand-darker: #ff7727;
  }
</style>
