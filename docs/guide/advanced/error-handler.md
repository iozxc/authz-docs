# 自定义错误拦截器



若以注解的方式配置了权限拦截和登录拦截、那么Authz抛出的异常默认是以json的形式抛出，若想自定义异常拦截和自己的系统融合，那么可以实现 `cn.omisheep.authz.core.interceptor.AuthzExceptionHandler`接口，并将其注入Spring以供Authz发现。



::: info 其中必须实现以下接口，若返回true表示不拦截，若返回false将会对此次请求拦截。

```java
 public boolean handle(HttpServletRequest request,
                          HttpServletResponse response,
                          HttpMeta httpMeta,
                          ExceptionStatus exceptionStatus,
                          List<Object> errorObjects) throws Exception;
```

:::



如下：

```java{2,5-9}
@Component
public class CustomAuthzExceptionHandler implements AuthzExceptionHandler {

    @Override
    public boolean handle(HttpServletRequest request,
                          HttpServletResponse response,
                          HttpMeta httpMeta,
                          ExceptionStatus exceptionStatus,
                          List<Object> errorObjects) throws Exception {
      
        if (exceptionStatus.equals(ExceptionStatus.MISMATCHED_URL)) {
            // url不存在
            return true; // 此错误不拦截
        }

        HttpUtils.returnResponse(exceptionStatus.getHttpStatus(), exceptionStatus.data());

        return false;
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
