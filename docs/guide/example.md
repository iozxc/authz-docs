# 简单示例

> 这里提供一个简单的示例，展示一套完整的登录流程以及验证逻辑。

[[toc]]

## 0. Authz的帮助类 AuHelper

在Authz内，大部分功能都能用一行代码（ <span style='color: #ce7171'>AuHelper</span>内的一个静态方法）完成。

```java
AuHelper.login(1);    // 登录userId为1的用户，返回：IssueToken ->内有AccessToken和RefreshToken
AuHelper.refreshToken("用户的RefreshTokenValue"); // 利用RefreshToken刷新获得新的AccessToken
AuHelper.getToken();    // 获取当前用户的Token，返回：Token
AuHelper.isLogin();    // 此次访问是否已经登录, 返回：true｜false
AuHelper.logout();    // 注销当前访问用户的当前设备
AuHelper.logoutAll();    // 注销当前访问用户的所有设备
AuHelper.logoutAllAt(2);    // 注销用户2的所有设备
AuHelper.logoutAt(2, "macOS");    // 注销用户2的macOS系统的设备
AuHelper.hasRole("admin");    // 查询当前访问用户是否含有指定角色标识， 返回：true｜false
AuHelper.hasPermission("admin");    // 查询当前访问用户是否含有指定权限标识，返回：true｜false
AuHelper.RSA.getRSAPrivateKey(); // 得到当前RSA的公钥， 返回String
AuHelper.OpenAuth.clientRegister("客户端名","回调url"); // 注册一个客户端信息 返回 ClientDetails
AuHelper.OpenAuth.createAuthorizationCode("客户端id","授权范围","回调url"); // 创建一个关于当前登录用户的授权码 ，返回 String
AuHelper.checkUserIsActive(1); // 检查用户1是否活跃， 返回true｜false
AuHelper.getActiveUserIdList(); // 查询活跃用户，返回：List<Object> 用户id集合
AuHelper.getNumberOfActiveUser(); // 查询活跃用户人数，返回：int
AuHelper.getActiveDevices(); // 查询活跃用户设备，返回：List<DeviceDetails>
AuHelper.getDevicesAt(1); // 获得用户id为1的所有设备信息，返回：List<DeviceDetails>
....
// 还有很多，不一一展示。
```

::: details

当然内部还有其他的Helper，但是都集成在一起了，所以通过 AuHelper便可以使用所有的功能，如OAuth2.0的功能以及登录登出的功能。

:::

## 1. Maven

> https://search.maven.org/search?q=authz-spring-boot-starter

```xml{7-11}
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <dependency>
    <groupId>cn.omisheep</groupId>
    <artifactId>authz-spring-boot-starter</artifactId>
    <version>LATEST</version>
  </dependency
  <dependency>
</dependencies>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-dependencies</artifactId>
      <version>2.3.7</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```



## 2. 配置

### 2.1. 基础配置(yml)

####  有redis的版本

```yaml
spring:
  application:
    name: authz-demo-standalone
  redis:
    host: localhost
    port: 6389
    password: 123456
    
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  cache:
    enable-redis: true
  dashboard:
    enabled: true
```

#### 无redis的版本

```yaml
spring:
  application:
    name: authz-demo
    
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  dashboard:
    enabled: true
```

### 2.2. 成功启动

配置好后直接启动，若没有报错，且能看到banner说明配置成功了。

```
               _    _          
      :)      | |  | |         
  __ _  _   _ | |_ | |__   ____
 / _` || | | || __|| '_ \ |_  /
| (_| || |_| || |_ | | | | / / 
 \__,_| \__,_| \__||_| |_|/___|
  		 Authz  vx.x.x
```

## 3. Controller

```java{12,19,22,28-29}
@RestController
public class UserController {

    static Map<Object, Object> res = ImmutableMap.builder()
            .put(1, "用户1的资源")
            .put(2, "用户2的资源").build();

    // 登录，获取令牌
    @PostMapping("/login")
    public IssueToken login(@RequestBody Map<String, String> user) {
        if ("authz".equals(user.get("username")) && "authz".equals(user.get("password"))) {
            return AuHelper.login(1);
        } else {
            return null;
        }
    }

    // 访问，以获取资源
    @AuthRequireLogin // 带上此注解，该接口就需要登录才能访问
    @GetMapping("/visit-login")
    public String getResources() {
        return (String) res.get(AuHelper.getUserId());
    }

    // 访问，以获取资源，此接口不需要登录
    @GetMapping("/visit-not-login")
    public String getResources2() {
        if (AuHelper.isLogin()) {
            return (String) res.get(AuHelper.getUserId());
        } else {
            return "未登录";
        }
    }

}

```

::: tip

Authz内不提供登录时的密码验证等环节，这个环节并不需要有，因为验证的环节各不相同。有账号密码登录，有邮箱登录，有手机号登录等等，这种登录方法很多，并且逻辑都不同，但是最后都是为了得到一个有效身份，所以Authz只需要你在这之前进行自定义的验证，然后进行登录即可。

:::

### 3.1 未登录状态的请求

在<span style='color: red'>未登录</span>状态访问**需要登录**的接口，`http的状态码为511`（可以自定义错误拦截器，根据需要返回自定义的返回内容，具体看[自定义错误拦截器](/guide/advanced/error-handler) ），返回结果：

```
get http://localhost:8080/visit-login

返回：
{
    "code": -101,
    "message": "Require login"
}
```

在<span style='color: red'>未登录</span>状态访问**不需要登录**的接口，`http的状态码为200`，返回结果：

```
get http://localhost:8080/visit-not-login

返回：
未登录
```

### 3.2 登录 - login

```
post http://localhost:8080/login

{
    "username": "authz",
    "password": "authz"
}

返回：
{
    "accessToken": "H4sIAAAAAAAAAKtWKs1MUbIy1FEqAdFK6RYVfp5OJlFKOkopJQVAgYD84pLcxLyg0rySzNxUfXM9I0s9I6BsVkkmUNY3Jd2rwsAgByiQWgFUbmhmZmBqYm5qbFgLAHyqHJBaAAAA.jpdrPvu7c8d7Q30fS1BLgJmEuIc1ms0yxvNHV33b-xo",
    "refreshToken": "H4sIAAAAAAAAAKtWKs1MUbIy1FHKKslUslJKt6jw83QyiVLSUUqtKABKmJkZmRqbmBsb1gIAY77xwCsAAAA.a4EOV_X0KhzkzcVdSjieIqNhgkhltmXl-f8-DJcyhLU",
    "expiresIn": 604800000
}
```

### 3.3 登录状态的请求

在<span style='color: green'>登录</span>状态访问**需要登录**的接口，`http的状态码为200`，返回结果：

```text
get http://localhost:8080/visit-login

返回：
用户1的资源
```

在<span style='color: green'>登录</span>状态访问**不需要登录**的接口，`http的状态码为200`，返回结果：

```
get http://localhost:8080/visit-not-login

返回：
用户1的资源
```

::: tip 补充

测试时若使用Postman、Apifox、Chrome浏览器等可用存储cookie的请求工具，那么在登录之后，并不需要做其他操作，因为默认会把登录的信息放在cookie里。当然也可以利用header来请求，把accessToken放在header中，具体请看 [登录&登出](/guide/basics/login) 
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