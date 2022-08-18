# 动态权限 & 控制台

[[toc]]



authz的dashboard目前为beta版本，所以很多功能还不全，现在还在开发中。



## 1. Dashboard的配置

[查看具体配置](/guide/settings#dashboard配置)

注意要开启dashboard必须将其中的`authz.dashboard.enabled`设为true，就算其他配置存在也无效

```yaml
authz:
  dashboard:
    enabled: true # 若开启必须设置为true，默认为关闭状态
    username: 'zxc' # dashboard的用户名
    password: 'zxc' # dashboard的密码
```



## 2. Dashboard的登录首页

在浏览器中输入项目的地址加上authz.html如下

> http[s]://localhost:8080/authz.html

 你就会看到如下的登录页面

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h51inbdkcfj219u0u00x5.jpg" alt="image-20220810113656422" style="zoom:50%;" />

输入刚刚设置的账号和密码，既可以进入主界面

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h51jhlm3grj213o0u0jtm.jpg" alt="image-20220810120606109" style="zoom:50%;" />

## 2. 动态修改接口的role和permission的权限

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h51jl9yqjaj21wm0u0mzo.jpg" alt="image-20220810120935764" style="zoom:50%;" />

## 3. 动态的查看用户的设备以及其他操作

- 查看近期访问设备

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h51le9epj1j220y0gmwgg.jpg" alt="image-20220810131205901" style="zoom:50%;" />

- 简单的封号操作

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h51lfl7jo5j213v0u0jt3.jpg" alt="image-20220810131323431"  />

## 4. Dashboard的安全性配置

### 4.1 多用户以及权限

当不止一个用户可以访问dashboard，且每个用户可以操作的权限级别不同，那么可以如下配置

```yaml
authz:
  dashboard:
    enabled: true
    username: 'zxc'
    password: 'zxc'
    permissions: all
    users: 
      - username: 'user1'
        password: 'user1'
        permissions: api,blacklist,docs,parameter
      - username: 'user2'
        password: 'user2'
        permissions: api
```

### 4.2 未响应时间

::: info 未响应时间

用户在页面一段时间内无操作，便会自动下线，默认时间10分钟

:::

```yaml
authz:
  dashboard:
    enabled: true
    username: 'zxc'
    password: 'zxc'
    unresponsive-expiration-time: '20m' # 修改为20分钟未响应就下线
```

### 4.3 ipRange限制

::: info 对网段进行限制

只允许某个网段内的用户才能访问dashboard，作用和之前的IPRangeLimit一样

:::

```yaml
authz:
  dashboard:
    enabled: true
    username: 'zxc'
    password: 'zxc'
    allow: "xx.xx.xx.xx/xx" # 只允许ip属于此网段的用户访问
    deny:  "xx.xx.xx.xx/xx" # 不允许ip属于此网段的用户访问
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