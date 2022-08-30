# 字段（数据列）权限



::: warning ⚠️注意

仅支持Mybatis

::: 

如有如下用户表

```java
@Data
@TableName("user")
@Accessors(chain = true)
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String nickname;
    private String username;
    private String email;
    private String password;
    private String avatar;
    private Date createTime;
}
```

## 1. 某字段需要权限才能获取



其中的**username字段**以及email字段不想让非admin用户查看，可以利用<span class="annotation">@AuthField</span>

```java{8,10}
@Data
@TableName("user")
@Accessors(chain = true)
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String nickname;
    @AuthField(requireRoles = "admin")
    private String username;
    @AuthField(requireRoles = "admin")
    private String email;
    private String password;
    private String avatar;
    private Date createTime;
}
```

::: info 结果为

> ```json
> [
> {
>  "id": ..,
>  "nickname": ..,
>  "username": ..,
>  "email": ..,
>  "password": ..,
>  "avatar": ..,
>  "createTime": ..
> },
> {
>  "id": ..,
>  "nickname": ..,
>  "username": ..,
>  "email": ..,
>  "password": ..,
>  "avatar": ..,
>  "createTime": ..
> }
> ]
> ```
>
> 当没有role：【admin】时
> ==>
>
> ```json
> [
> {
>  "id": ..,
>  "nickname": ..,
>  "password": ..,
>  "avatar": ..,
>  "createTime": ..
> },
> {
>  "id": ..,
>  "nickname": ..,
>  "password": ..,
>  "avatar": ..,
>  "createTime": ..
> }
> ]
> ```
>
> 

:::

## 2. 某字段只有登录才能查看


同理，若不想让非登录用户看到avatar字段，可以将<span class="annotation">@AuthField</span>无参的直接添加在字段上，如下

```java{8,10,13}
@Data
@TableName("user")
@Accessors(chain = true)
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String nickname;
    @AuthField(requireRoles = "admin")
    private String username;
    @AuthField(requireRoles = "admin")
    private String email;
    private String password;
    @AuthField
    private String avatar;
    private Date createTime;
}
```
