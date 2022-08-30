# 参数权限

[[toc]]

参数权限就是根据用户当前的身份、对参数进行访问限制



## 1. 参数权限示例

### 1.1 示例1

- zxc 能够访问【id = #{id}-156】和【id = 177】
- admin 能够访问【id = 146-200】
- 而访问【id = 177】必须要有**role**: 【admin】
- 如果某个用户有两个角色，那么取并集。如 zxc,admin 能访问123-200

```java{1,4-5}
@Roles({"admin", "zxc"})
@GetMapping("/visit/{id}")
public Result visit(@BatchAuthParam({
       @AuthParam(requireRoles = "zxc", range = {"#{id}-156", "177"}),
       @AuthParam(requireRoles = "admin", range = "146-200", resources = "177")
}) @PathVariable int id) {
    ...
}
```

### 1.2 示例2

- 用户想要操作【查询】、【重启】 必须需要 ==> **permissions**:【工程师权限】或者 【运维权限】或者【技术人员权限】
- 用户想要操作【开机】、【关机】、【添加】 必须需要 ==> **permissions**:【运维权限】
- 用户想要操作【登录】 必须需要 ==> **permissions**:【技术人员权限】

```java{1,4-6}
@Roles({"admin", "zxc"})
@GetMapping("/operate")
public Result operate(@BatchAuthParam({
        @AuthParam(requirePermissions = {"工程师权限", "运维权限", "技术人员权限"}, resources = {"查询", "重启"}),
        @AuthParam(requirePermissions = {"运维权限"}, resources = {"开机", "关机", "添加"}),
        @AuthParam(requirePermissions = {"技术人员权限"}, resources = "登录"),
}) @RequestParam(required = false) String operate) {
    ...
}
```



## 2.2 参数权限的补充说明

1. 其中<span class="annotation">@AuthParam</span> 和 <span class="annotation">@BatchAuthParam</span> 只能作用于接口的参数上才会生效

2. 当需要多个<span class="annotation">@AuthParam</span>时可以用<span class="annotation">@BatchAuthParam</span> 进行包裹

3. resources的级别大于range，见示例1，因为【id=177】需要**role**:【admin】的权限，关系强于 > **role**:【zxc】时只能访问【#{id}-156】和【177】。所以在配置了resources时，其他的配置的range可能会失效

