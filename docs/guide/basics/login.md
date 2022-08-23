# 登录 & 登出

[[toc]]

## 1. 基本的登录逻辑

在Authz中，登录与验证时分开的，也就是说登录是**非验证型**的，即<u>不需要验证便可以直接登录</u>，**所以在这之前需要你进行自己的验证逻辑**，来判断这个用户是否登录成功。

::: tip 说明

这里的验证不仅限于账号密码，还可以是邮箱、手机短信验证等

:::

在登录之前，还得先需要知道一些事，

**Authz会给登录后的用户发布签名的token，所以必须有以下配置，也就是密钥**

```yaml
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
```



## 2. 登录

::: warning 注意

若当前请求已登录，那么此次请求用户的登录信息会失效。相当于 logout 再 login。

可以配置为不失效 ==>  [登录前退出 - authz.token.logout-before-login](/guide/settings#token配置)

:::

::: info API

```java
@NonNull
IssueToken login(@NonNull Object userId [, @NonNull String deviceType, @Nullable String deviceId])
```

- **说明**

  > 用户登录 <可用于非请求环节>
  >若线程绑定了Request，则登录成功之后会默认给请求返回Cookie 过期时间为AccessToken的过期时间，若不需要，请自行删除
  
- **参数**

  - <u>userId</u> - 用户id 不为空
  - <u>deviceType</u> <u>[可选]</u> - 设备类型 不为空 默认为user-agnet，若没有则为unknown
  - <u>deviceId</u>  <u>[可选]</u> - 设备id  可为null 

- **返回**

  - 授权后的IssueToken(accessToken以及refreshToken)，返回空则登录失败

:::


### 2.1 只给定userId

```java{16}
@Autowired
private UserService userService;

@PostMapping("/login")
public IssueToken login(@RequestBody User user) {
  
  	// 验证user是否存在以及有效，这里的验证不仅限于账号密码，还可以是邮箱、手机短信验证等
  	// 如：    
  	//    if ("admin".equals(user.getUsername()) && "12345".equals(user.getPassword())) {
    //          登录成功
    //           ...
    //    }
  	int userId = userService.login(user); // 登录成功返回用户id，否则返回-1
  		
    if (userId > 0) {
        return AuHelper.login(userId); // 将IssueToken返回，或者用你的Result包装一下
    } else {
        return null;
    }
  
}
```

### 2.2 绑定<u>设备类型</u>（操作系统、平台）等

```java{2-6}
if (userId > 0) {
	return AuHelper.login(userId, "Mac");
	// 或者 
	// AuHelper.login(userId, AuHelper.getPlatform().getName(), null);
	// AuHelper.getPlatform().getName() <==> 获取当前请求的平台名称，
	// 有iPhone、iPad、Android、Mac、Windows等
} else {
	return null;
}
```

### 2.3 绑定<u>设备类型、设备Id</u>

::: warning 注意

设备id可以为null，设备id在同设备类型中是唯一的。同一设备id可以有不同的设备类型

如：

Mac端的设备、且设备id为ABCD的设备

Mac端的设备、且设备id为EFGH的设备

设备id为ABCD的设备可能处于安卓设备类型下也可能处于自定义的设备类型如qq、微信等。

所以设备id并全局唯一，而是在某一设备类型中唯一，在 [设备管理](/guide/basics/device-control) 里会有用

:::

```java{2}
if (userId > 0) {
	return AuHelper.login(userId, "Mac", "FFFFFFFF-FFFF-FFFF");
	// 或者 AuHelper.login(userId, AuHelper.getPlatform().getName(), null);
	// 或者 AuHelper.login(userId, AuHelper.getOS().getName(), null);
} else {
	return null;
}
```

::: tip 补充

默认情况下  AuHelper.login(userId) 在没有指定deviceType时，默认的值为user-agent，在没有指定deviceId时，默认的值为null

:::



## 3. 登出（退出登录）

::: info API

```java
void logout([@NonNull String deviceType, @Nullable String deviceId]) throws NotLoginException
```

- **说明**

  > 注销当前用户的当前设备
  >
  > 【deviceType】注销当前用户指定**设备类型**设备
  >
  > 【deviceType，deviceId】注销当前用指定户**设备类型、设备id**的设备
  
- **参数**

  - <u>deviceType</u>  <u>[可选]</u> - 退出设备的类型
  - <u>deviceId</u> <u>[可选]</u> - 退出设备的id
  
- **异常**

  - NotLoginException 未登录调用此方法抛出异常
  

:::

### 3.1 退出<u>当前请求用户</u>

```java{1,4}
@AuthRequireLogin
@GetMapping("/logout")
public String logout() {
    AuHelper.logout();
    return "ok";
}
```

### 3.2 退出<u>当前请求用户</u>的<u>任意类型的设备</u>

```java{1,4}
@AuthRequireLogin
@GetMapping("/logout")
public String logout(@RequestParam String deviceType) {
    AuHelper.logout(deviceType);
    return "ok";
}
```

### 3.3 退出<u>当前请求用户</u>的<u>任意设备类型&任意设备ID的设备</u>

```java{1,4}
@AuthRequireLogin
@GetMapping("/logout")
public String logout(@RequestParam String deviceType, @RequestParam String deviceId) {
    AuHelper.logout(deviceType, deviceId);
    return "ok";
}
```

---

::: info API

```java
void logoutAll() throws NotLoginException
```

- **说明**

  > 注销当前用户所有设备
  
- **异常**

  - <u>NotLoginException</u>  未登录抛出异常
  

:::

### 3.4 退出<u>当前请求用户</u>的<u>所有设备</u>

```java{1,4}
@AuthRequireLogin
@GetMapping("/logout-all")
public String logout() {
    AuHelper.logoutAll();
    return "ok";
}
```



## 4. 统一的登录异常处理

直接调用需要登录的操作时，当前线程（请求线程）如果未登录，那么将会抛出登录异常，如果不想处理这个异常，可以进行**全局异常拦截**，例如：

```java{5}
@ControllerAdvice
@ResponseBody
public class WebExceptionHandler {

    @ExceptionHandler(NotLoginException.class)
    public Result notLoginException() {
        return Result.FAIL.data();
    }
  
}
```



## 5. 登录请求以及token配置（如何使用返回的token，token的过期时间）

在前面login获得的token的格式应该如下

```json
{
    "accessToken": "H4sIAAAAAAAAAKtWKs1MUbIy1FEqAdFKxRVRfqFRXhVKOkopJQVAgYD84pLcxLyg0rySzNxUfXM9I0s9I6BsVkkmUNY3LNCr3K84ECiQWgFUbmhmZmBuYGxpaVoLAKNv5ldaAAAA.jLaYmxgRYevoZOBg3wp5dzsGF4cLX28jGEhVas6qpMM",
    "refreshToken": "H4sIAAAAAAAAAKtWKs1MUbIy1FHKKslUslIqrojyC43yqlDSUUqtKABKmJkZmVkaGlqa1gIAHoBGNSsAAAA.kbnom6IDbj7W5I1zvQO_s5oZC532YlyugDJibBFQoGc",
    "expiresIn": 604800000
}
```

[查看具体配置](/guide/settings#token配置)

### 5.1 双Token模式

这种模式类似于OpenAuth2.0的模式，默认情况下会生成两个token，一个为**accessToken**，用来正常访问系统。一个为**refreshToken**用来刷新accessToken获得新的accessToken和refreshToken。但是没有scope的概念

两个token的过期时间可以如下控制

```yaml{4-5}
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    access-time: 1d
    refresh-time: 30d
```

**expiresIn**为accessToken的过期时间，在快过期时，理应用refreshToken去刷新，从而得到新的accessToken。

::: info API

```java
IssueToken refreshToken(@NonNull String refreshToken) throws RefreshTokenExpiredException, TokenException
```

刷新token的接口，可以用accessToken来获得新的accessToken和refreshToken

:::



注意此refreshToken刷新后将失效，也就是说它是一次性的，刷新后还是会获得如上格式的结果，两个token和一个accessToken过期时间。其中**expiresIn不会改变(获得的新accessToken还是1天过期)**，**且并不会延长refreshToken的时间**

```json
{
    "accessToken": "...",
    "refreshToken": "...",
    "expiresIn": 86400000 
}
```

### 5.2 单Token模式

如果不需要刷新accessToken，也就是只需要用一个token就够了，那么可以把accessToken的时间和refreshToken的有效时间设置为一样即可。

```yaml{4-5}
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    access-time: 30d
    refresh-time: 30d
```


### 5.3 cookie携带token

这是默认情况下的实现，且相关的cookie名为`atkn` （authz token），可以修改，且不需要做任何操作，只需要在前端支持cookie，且请求时携带cookie即可

也可以修改cookie的名字。

```yaml{4}
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    cookie-name: 'your cookie name'
```



#### 5.4 Header携带token

默认情况会从header中的`authorization`读取token且前缀为`Bearer`

也就是说头信息必须如下，注意`Bearer`之后记得空一格

```
Authorization: Bearer H4sIAAAAAAAAAKtWKs1MUbIy1FEqAdFKxRVRfqFRXhVKOkopJQVAgYD84pLcxLyg0rySzNxUfXM9I0s9I6BsVkkmUNY3LNCr3K84ECiQWgFUbmhmZmBuYGxpaVoLAKNv5ldaAAAA.jLaYmxgRYevoZOBg3wp5dzsGF4cLX28jGEhVas6qpMM
```

当然这个名字和前缀也可以修改

```yaml{4-5}
authz:
  token:
    key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    header-name: 'your header name'
    header-prefix: 'your header prefix'
```

#### 5.5 AuthRequestToken、参数携带token

利用`AuthRequestToken`可以实现参数携带token，同时也支持上面两种

在请求时，在后面带上参数

如 `~/admin/check?参数名={拿到的accessToken}`

```java{3,6}
@RestController
@RequestMapping("/admin")
@AuthRequestToken("参数名") // <==> @AuthRequestToken(param = "参数名")
public class OAuthController2 { 

    @AuthRequireLogin
    @GetMapping("/check")
    public String check() {
        return "ok";
    }
  
}
```




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
