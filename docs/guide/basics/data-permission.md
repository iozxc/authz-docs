# 数据（行）权限

[[toc]]



## 1. 简单举例

数据权限也是数据行权限，根据用户的不同的身份在不改变sql以及其他代码的情况下，通过动态的生成不同的sql来完成获取不同的数据。

以下只是一个简单举例，更多详细内容之后会补充

```java
@BatchAuthData({
        // (1) 订单，可以由本人查看
        @AuthData(requireRoles = {"销售人员"},
                condition = "id={userId}"),

        // (1) 销售单，销售人员可以查看自己的，销售经理只查看销售金额大于100,000的或者小于4000的。
        @AuthData(requireRoles = {"销售人员", "销售经理"},
                condition = "id={userId} or ( {userId} in {销售经理Id} and (amount > 100000 or amount < 4000) )"),
        // (2) 销售单，销售人员可以查看自己的，上级领导查看也能查看，销售经理只查看销售金额大于100,000的或者小于4000的。
        @AuthData(requireRoles = {"销售人员", "销售经理", "领导"},
                condition = "id={userId} or {userId} in {领导Id} or ( {userId} in {销售经理Id} and (amount > 100000 or amount < 4000) )"),

        // （1）普通员工（仅能看到自己的信息）
        @AuthData(requireRoles = "普通员工",
                condition = "id={userId}"),
        //（2）部门管理人（仅能看到本部门）
        @AuthData(requireRoles = {"部门管理人员"},
                condition = "dept in {本部门Id}",
                args = @Arg(resource = "本部门Id", args = "{currentUserId}")),
        //（3）分公司董事（其他分公司所有的部门，除了董事会部门）
        @AuthData(requireRoles = {"分公司董事"},
                condition = "orgId in {其他分公司} and dept not in {董事会部门}",
                args = {
                        @Arg(resource = "其他分公司", args = "{userId}"),
                        @Arg(resource = "董事会部门", args = "{其他分公司}")
                }
        ),
        //（4）分公司总负责人（看到分公司所有的信息）
        @AuthData(requireRoles = {"分公司总负责人"},
                condition = "orgId in {其他分公司}",
                args = {
                        @Arg(resource = "其他分公司", args = "{userId}")
                }
        ),
        //（5）总公司董事会（除了总公司董事会之外的所有总，自公司的所有部门）
        @AuthData(requireRoles = {"总公司董事会"},
                condition = "dept not in {董事会部门}",
                args = @Arg(resource = "董事会部门")
        ),
        //（6）总董事
        @AuthData(requireRoles = "总董事"),


        // (1) admin可以查看 username为 201803010224 201803010212 201803010222
        @AuthData(requireRoles = "admin", condition = "username in (201803010224,201803010212,201803010222)"),
        @AuthData(requireRoles = {"admin", "user"}, condition = "username in (201803010213)"),
        // ==> admin 可以看到 201803010224、201803010212、201803010222、201803010213

})
@AuthData(requireRoles = {"分公司董事"},
        condition = "orgId in #{其他分公司} and dept not in #{董事会部门}",
        args = {
                @Arg(resource = "其他分公司", args = "#{userId}"),
                @Arg(resource = "董事会部门", args = "#{其他分公司}")
        }
)
@Data
public class AuthzDataTest {
}
```

## 2. ArgResource

如上的#{xxx}还有之前在参数权限里面的#{id}等都是一个参数资源。这是一个动态的值，和spring的SpEL不同，ArgResource是一个简单的，快速的资源，可以直接定位到某个方法，而不需要再写很长的表达式

在方法上用注解<span style='color: #9e880d'>ArgResource</span>标记**静态方法**或者**bean的方法**，都可以实现资源申请。

- 标记静态方法

```java{3}
public class TestArgResource {

    @ArgResource(description = "id") // 默认为方法名
    public static int id() {
        return 1;
    }
  
}
```

- 标记bean的方法

```java{5}
@Service
public class UserService extends ServiceImpl<UserMapper, User>
        implements IUserService {

    @ArgResource("所有用户") // 在数据权限和参数权限中可以 #{所有用户}这样使用
    @Roles("admin")
    public List<User> ls() {
        return list();
    }
  
}
```

::: warning 注意

若标记在了需要权限才能访问的方法上时，会优先检查权限是否满足。

:::

## 3. 默认的ArgResource

在Authz内有3个默认的参数

- userId - 当前用户id
- token - 当前用户的token
- httpMeta - 当前请求的元信息



## 4. AuthzResourcesScan

最后也是最重要的一点，如果想让**资源扫描生效**，**数据权限**、以及后续的**字段权限**生效，需要加上注解<span style='color: #9e880d'>AuthzResourcesScan</span>

- 其中的**entity**为数据权限所绑定的实体类所在包路径，可以指定多个，

- 其中的**args**为资源所在的包路径

```java
@AuthzResourcesScan(entity = "cn.omisheep.authz.demo.entity",
        args = {"cn.omisheep.authz.demo.service",
                "cn.omisheep.authz.demo.mapper"})
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