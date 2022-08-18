# OpenAuth2
[[toc]]

让你的系统也能给别人授权



## 1. 快速学会开放授权

1. **注册客户端** ***clientRegister***(**客户端name: String, 重定向url: String**) => 返回客户端信息（客户端id，客户端name，客户端密钥，重定向url）

2. **获取授权码** ***createAuthorizationCode***(**客户端id: String,授权访问: String, 重定向url: String**) => 客户端id+登录用户+权限范围 、获得登录用户的授权码

3. **验证授权**

   - 验证授权码 ***authorizeByCode***(**客户端id: String, 客户端密钥: String, 授权码: String**) ==> 利用授权码去获得IssueToken

   - 登录授权 ***authorizeByPassword***(**客户端id: String, 客户端密钥: String, 授权权范围: String**) ==> 若请求登录即可获得IssueToken



```java
@RestController("openAuthController")
@RequestMapping("/oauth")
public class OAuthController {

    // 第一步
    @GetMapping("/register")
    public ClientDetails register(@RequestParam String clientName, 
                                  @RequestParam String redirectUrl) {
        return AuHelper.OpenAuth.clientRegister(clientName, redirectUrl);
    }

    // 第二步
    @AuthReuqireLogin // 不加这个便会在createAuthorizationCode方法里抛出异常，NotLogin异常
    @GetMapping("/get-code")
    public String getCode(@RequestParam String clientId, 
                          @RequestParam String scope, 
                          @RequestParam String redirectUrl) {
        return AuHelper.OpenAuth.createAuthorizationCode(clientId, scope, redirectUrl);
    }

    // 第三步
    @GetMapping("/check-code")
    public IssueToken checkCode(@RequestParam String clientId, 
                                @RequestParam String clientSecret, 
                                @RequestParam String code) {
        return AuHelper.OpenAuth.authorizeByCode(clientId, clientSecret, code);
    }
  
}
```



## 2. 给接口赋予访问范围

::: warning 注意

通过正常登录的用户不受scope的影响，能访问所有资源

:::

```java
@RestController
@RequestMapping("/oauth2")
@OAuthScope("basic")
public class OAuthController2 {

   
    @GetMapping("/basic")
    public String basic() {
        return "ok";
    }
  
    @OAuthScope("super")
    @GetMapping("/super")
    public String super() {
        return "ok";
    }
  
}
```

以上虽然可以规定接口和controller的scope，但是并不会生效，因为没有配置token的来源



## 3 开发授权的token的来源，接口参数名设置

::: tip 提示

默认情况下要让Authz拦截这些请求并且让这些上述的scope时生效，则需要特别的告诉authz参数名为什么

:::

### 3.1 通过参数的方式传递accessToken

```java
@RestController
@RequestMapping("/oauth2")
@OAuthScope("basic")
@AuthRequestToken("access_token") // <==> @AuthRequestToken(param = "access_token")
public class OAuthController2 { 

   
    @GetMapping("/basic")
    public String basic() {
        return "ok";
    }
  
    @OAuthScope("super")
    @GetMapping("/super")
    public String super() {
        return "ok";
    }
  
}
```

在请求时，在后面带上参数

如http://localhost:8080/oauth2/basic?access_token={你刚刚拿到的accessToken}

### 3.2 通过cookie的方式传递accessToken

```java
@RestController
@RequestMapping("/oauth2")
@OAuthScope("basic")
@AuthRequestToken(cookie="access_token") // cookie名
public class OAuthController2 { 

   
    @GetMapping("/basic")
    public String basic() {
        return "ok";
    }
  
    @OAuthScope("super")
    @GetMapping("/super")
    public String super() {
        return "ok";
    }
  
}
```

在请求时，将accessToken放在cookie中传递。这个有点难度。

### 3.2 通过header的方式传递accessToken

```java
@RestController
@RequestMapping("/oauth2")
@OAuthScope("basic")
@AuthRequestToken(header = "authorization") // header名
public class OAuthController2 { 

   
    @GetMapping("/basic")
    public String basic() {
        return "ok";
    }
  
    @OAuthScope("super")
    @GetMapping("/super")
    public String super() {
        return "ok";
    }
  
}
```

在请求时，在头信息中添加accessToken信息。

## 4. 其他配置

### 4.1 授权码过期时间

```yaml
authz:
  oauth:
    authorization-code-time: "20m" # 20e分钟过期
```



### 4.2 客户端Id长度

```yaml
authz:
  oauth:
    client-id-length: 24
```



### 4.3 客户端密钥长度

```yaml
authz:
  oauth:
    client-secret-length: 30
```



### 4.4 默认权限

::: info 默认权限

1. `@OAuthScopeBasic`标识之后的额外scope 

2. 默认授予的权限。

   在没有给出scope时所赋予的权限 ==>

   ```java
   AuHelper.OpenAuth.createBasicScopeAuthorizationCode(@NonNull String clientId,@NonNull String redirectUrl)
   ```

:::

```yaml
authz:
  oauth:
    default-basic-scope: 'basic'
```

