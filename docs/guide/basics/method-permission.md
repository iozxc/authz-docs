# 方法权限

方法权限类似于接口权限，在任意的bean上或者bean中任意的方法上添加：<span class="annotation">@AuthRequireLogin</span> 、<span class="annotation">@Auth</span> 、<span class="annotation">@Roles</span> 、<span class="annotation">@Perms</span> 就可以给方法添加上权限。

```java{1,8}
@AuthRequireLogin
@Service
public class UserService extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Roles("admin")
    @Override
    public List<User> listAll() {
        return list();
    }
}
```

若此请求的用户权限未满足或者未登录，那么将会抛出权限异常，而不是直接返回权限。这里和api上的拦截不同。所以需要再定义一个错误拦截器用来拦截这些方法权限不足的错误。

```java{5}
@ControllerAdvice
@ResponseBody
public class WebExceptionHandler {

    @ExceptionHandler(PermissionException.class)
    public Result authzException(PermissionException permissionException) {
        return Result.FAIL.data();
    }
  
}
```
