# API权限

[[toc]]



这里的API权限通常指的是<span style='color: #9e880d'>@Mapping</span>**注解标记过的方法**的权限

如下的接口就具有权限

```java{1}
@Roles("zxc")
@GetMapping("/role-zxc")
public String roleZxc() {
    return "ok";
}
```



## 1. @Auth、@Roles和@Perms

### 1.1  @Auth

当需要给接口添加权限时，如接口需要**角色zxc**才能访问时，可以如下使用

```java{1}
@Auth(requireRoles = "zxc")
@GetMapping("/role-zxc")
public String roleZxc() {
    return "ok";
}
```

接口需要**权限user:create**才能访问时，可以如下使用

```java{1}
@Auth(requirePermissions = "user:create")
@GetMapping("/create-user")
public String createUser() {
    return "ok";
}
```

接口需要**权限user:delete**以及**角色admin**才能访问时，可以如下使用

```java{1}
@Auth(requireRoles = "admin", requirePermissions = "user:delete")
@GetMapping("/delete-user")
public String deleteUser() {
    return "ok";
}
```

### 1.2 @Roles和@Perms

在一般情况下，某个接口只会限制一种类型，如需要某种角色或者需要某种权限才能访问，那么使用<span style='color: #9e880d'>@Auth</span>就有点太麻烦了，所以这里有两个简写`@Roles` 和 `@Perms`

<span style='color: #9e880d'>@Roles</span> <==> <span style='color: #9e880d'>@Auth</span>中的role权限配置，<span style='color: #9e880d'>@Perms</span> <==><span style='color: #9e880d'>@Auth</span>中的permission权限配置

所以上述接口可以这样写

```java{1,7,13-14}
@Roles("zxc") // <==> @Auth(requireRoles = "zxc")
@GetMapping("/role-zxc")
public String roleZxc() {
    return "ok";
}

@Perms("user:create") // <==> @Auth(requirePermissions = "user:create")
@GetMapping("/create-user")
public String createUser() {
    return "ok";
}

@Roles("zxc") 
@Perms("user:delete")  //  <==> @Auth(requireRoles = "admin", requirePermissions = "user:delete")
@GetMapping("/delete-user")
public String deleteUser() {
    return "ok";
}
```

### 1.3 exclude（排除）

- 如果某个接口不是需要某种角色，而是排除某种角色，如某个接口不让**role为`ban`的用户**访问，那么可以这样写

> @Roles(exclude = "ban")  <==>  @Auth(excludeRoles = "admin")

- 如果某个接口不是需要某种权限，而是排除某种权限，如某个接口不让有**权限为`forbid:all`的用户**访问，那么可以这样写

> @Perms(exclude = "forbid:all")  <==>  @Auth(excludePermissions = "forbid:all")



## 2. Controller的权限

当某个controller中的所有接口都需要验证权限时，如专属给admin的controller，所有的接口都需要验证用户是否有admin权限，那么就可以在Controller上添加 <span style='color: #9e880d'>@Roles</span>。

```java{1}
@Roles("admin")
@RestController
@RequestMapping("/admin-api")
public class AuthzController {
   
    @GetMapping("/get-data")
    public String getData() {
        return "ok";
    }
  
    @PostMapping("/put-data")
    public String putData(Map<String,String> data) {
        return "ok";
    }
  
}
```

以上 <==>

```java{5,11}
@RestController
@RequestMapping("/admin-api")
public class AuthzController {
   
    @Roles("admin")
    @GetMapping("/get-data")
    public String getData() {
        return "ok";
    }
  
    @Roles("admin")
    @PostMapping("/put-data")
    public String putData(Map<String,String> data) {
        return "ok";
    }
  
}
```

若其中的某几个方法还需要其他的role，可以继续添加。

```java{1,6}
@Roles("admin")
@RestController
@RequestMapping("/admin-api")
public class AuthzController {
   
    @Roles("zxc")
    @GetMapping("/get-data")
    public String getData() {
        return "ok";
    }
  
    @PostMapping("/put-data")
    public String putData(Map<String,String> data) {
        return "ok";
    }
  
}
```

`/admin-api/get-data`权限验证逻辑整体上看为**先验证是否满足controller上的权限**，**再验证是否满足方法的权限**



## 3. 权限并、权限或

### 3.1 权限并

::: tip 权限并
当某一些接口只能用户同时存在几种身份时才能访问，这就是**权限的并**
:::



- 用户只有在同时拥有【zxc】【admin】 这两种role权限时**才能访问接口**

```java{1}
@Roles("zxc,admin") // <==> 用户只有在同时拥有【zxc】【admin】 这两种role权限时才能访问接口
@GetMapping("/get-data")
public String getData() {
    return "ok";
}
```
- 用户只有在同时拥有【r1】【r2】 这两种role权限时**就会被拒绝访问接口**

```java{1}
@Roles(exclude = "r1,r2") // <==> 用户只有在同时拥有【r1】【r2】 这两种role权限时就会被拒绝访问接口
@GetMapping("/get-data")
public String getData() {
    return "ok";
}
```

- 用户只有在同时拥有【role1】【role2】 这两种role权限时**才能访问**Controller里面的所有接口

```java{1}
@Roles("role1,role2") // <==> 用户只有在同时拥有【role1】【role2】 这两种role权限时才能访问Controller里面的所有接口
@RestController
@RequestMapping("/admin-api")
public class AuthzController {
   
    @GetMapping("/get-data")
    public String getData() {
        return "ok";
    }
  
    @PostMapping("/put-data")
    public String putData(Map<String,String> data) {
        return "ok";
    }
  
}
```



### 3.2 权限或

::: tip 权限或
当某一些接口允许要么A访问要么B访问，但是就不让C访问，这就是**权限的或**
:::



- 用户要么拥有【zxc】要么拥有【admin】 这两种role权限的任意一个时**才能访问接口**

```java{1}
@Roles({"admin","zxc"}) // <==> 用户要么拥有【zxc】要么拥有【admin】 这两种role权限的任意一个时才能访问接口
@GetMapping("/get-data")
public String getData() {
    return "ok";
}
```

-  用户要么拥有【r1】要么拥有【r2】 这两种role权限的任意一个时**就会拒绝访问接口**

```java{1}
@Roles(exclude = {"r1","r2"}) // <==> 用户要么拥有【r1】要么拥有【r2】 这两种role权限的任意一个时就会拒绝访问接口
@GetMapping("/get-data")
public String getData() {
    return "ok";
}
```

- 用户要么拥有【role1】要么拥有【role2】 这两种role权限的任意一个时**才能访问**Controller里面的所有接口

```java{1}
@Roles({"role1","role2"}) // <==> 用户要么拥有【role1】要么拥有【role2】 这两种role权限的任意一个时才能访问Controller里面的所有接口
@RestController
@RequestMapping("/admin-api")
public class AuthzController {
   
    @GetMapping("/get-data")
    public String getData() {
        return "ok";
    }
  
    @PostMapping("/put-data")
    public String putData(Map<String,String> data) {
        return "ok";
    }
  
}
```

### 3.3. 权限并与或的混合使用

::: tip 权限并与或的混合使用

当某一些接口的验证逻辑很复杂，那么允许并与或混合使用

:::

- 要么拥有角色【r1】，要么拥有角色【r2】，要么同时拥有角色【r3和r4】时才能访问接口

```java{1}
@Roles({"r1","r2","r3,r4"}) // <==> 要么拥有角色【r1】，要么拥有角色【r2】，要么同时拥有角色【r3和r4】时才能访问接口
@GetMapping("/get-data")
public String getData() {
    return "ok";
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