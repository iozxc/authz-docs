# PermLibrary

[[toc]]

## 1. 什么是PermLibrary

PermLibrary是Permission Library（权限库）的简称，Authz将从这里获取权限，这里也可以叫做数据源。这里的权限不是登录权限，而是*RBAC*模型(Role-Based Access Control:基于角色的访问控制)的角色或者权限信息。

在后续的所有权限相关操作中，最最重要的的就是**权限的获取**，必须得知道用户所具有的权限，才能为系统进行权限拦截。



## 2 如何使用PermLibrary

为了暴露数据源给Authz，你需要自定义一个自己的PermLibrary

### 2.1 PermLibrary接口

```java{1,9,17-18}
public interface PermLibrary<K> {

    /**
     * 根据userId获取该用户的role集合
     *
     * @param userId role
     * @return 权限
     */
    Collection<String> getRolesByUserId(K userId);

    /**
     * 根据role获取该role所具有的权限集合
     *
     * @param role role
     * @return 权限
     */
    default Collection<String> getPermissionsByRole(String role) {
        return new ArrayList<>(0);
    }

}
```

::: tip

如果系统十分简单，只需要用到角色进行权限分级，那么只实现其中的getRolesByUserId即可。

:::

### 2.2 自定义PermLibrary

::: tip

自定义的PermLibrary需要将其注册为Spring组件，以供Authz发现。

在没有配置的情况下，Authz也有默认的实现，getRolesByUserId和getPermissionsByRole都将返回空集合

:::

### 2.2.1 固定权限

```java{1-2,16-18,21-23}
@Component
public class UserPermLibrary implements PermLibrary<Integer> {

    static HashMap<Integer, List<String>> roles = new HashMap<>();
    static HashMap<String, List<String>>  perms = new HashMap<>();

    static {
        roles.put(1, Collections.singletonList("admin")); // admin
        roles.put(2, Arrays.asList("zxc", "user")); // zxc, user

        perms.put("admin", Arrays.asList("user:create", "user:read", "user:update", "user:delete"));
        perms.put("zxc", Arrays.asList("user:read", "user:update"));
    }

    @Override
    public Collection<String> getRolesByUserId(Integer userId) {
        return roles.get(userId);
    }

    @Override
    public Collection<String> getPermissionsByRole(String role) {
        return perms.get(role);
    }

}
```

### 2.2.2 从数据库等其他来源获取权限

```java{1-2,5,8-10,13-15}
@Component
public class UserPermLibrary implements PermLibrary<Integer> {

    @Autowired
    private RbacService                rbacService;
    
    @Override
    public Collection<String> getRolesByUserId(Integer userId) {
        return Arrays.asList(rbacService.getRolesByUserId(userId).split(","));
    }

    @Override
    public Collection<String> getPermissionsByRole(String role) {
        return rbacService.getPermissionsByRole(role);
    }
  
}
```



## 3.1 与数据权限的冲突

若你没有使用数据权限，此节可以跳过。

如果你用上了数据权限，那么就会发现， 在L2最开始没有缓存用户的role以及permission信息时，当一名用户去访问添加了数据权限的RBAC表时，就会触发循环。

简短简述一下原因：

1. 用户访问需要权限的<u>rbac表</u>
2. 为了知晓访问用户的权限而去查询<u>rbac表</u> -> 跳转1



所以:
<span style='color: #ff6565'>在PermLibrary里面的getRolesByUserId和getPermissionsByRole方法中，所有的数据权限都将失效。</span>





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