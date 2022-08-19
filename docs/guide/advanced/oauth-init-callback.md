# OpenAuth2 的初始化、资源库、回调函数



## 1. OpenAuthLibrary

使用逻辑和PermLibrary一样，这里是OpenAuth的数据来源，**init**为从数据库初始化的数据，这个数据若开启了二级缓存，那么会保存在二级缓存中。否则会在一级缓存里

```java{9,16,25,32,40}
public interface OpenAuthLibrary extends AuthorizationCallback {

    /**
     * listAll 从数据库【获取】资源。用于初始化注册过的客户端信息
     *
     * @return 所有注册过的客户端信息 List（客户端id，客户端name，客户端密钥，重定向url）
     */
    @NonNull
    List<ClientDetails> init();

    /**
     * 从数据库【添加】资源，新增客户端信息
     *
     * @param clientDetails 客户端的详细信息（客户端id，客户端name，客户端密钥，重定向url）
     */
    void registerClient(@NonNull ClientDetails clientDetails);

    /**
     * 从数据库【获取】资源，通过clientId获取客户端信息
     *
     * @param clientId 客户端id
     * @return 客户端的详细信息（客户端id，客户端name，客户端密钥，重定向url）
     */
    @Nullable
    ClientDetails getClientById(@NonNull String clientId);

    /**
     * 从数据库【删除】资源，通过clientId删除客户端信息
     *
     * @param clientId 客户端id
     */
    void deleteClientById(@NonNull String clientId);

    /**
     * 成功授权时的回调方法
     *
     * @param authorizedDeviceDetails 授权信息
     */
    @Override
    default void authorize(@NonNull AuthorizedDeviceDetails authorizedDeviceDetails) {

    }

}
```



## 2. 授权成功、删除授权、授权时的回调方法

只需要实现此接口，并将其注入Spring，便能实现回调方法

```java{9,16,26}
@FunctionalInterface
public interface AuthorizationCallback {

    /**
     * 成功授权时的回调方法
     *
     * @param authorizedDeviceDetails 授权信息
     */
    void authorize(@NonNull AuthorizedDeviceDetails authorizedDeviceDetails);

    /**
     * 删除授权时的回调方法
     *
     * @param id 授权信息id
     */
    default void removeAuthorization(@NonNull String id) {

    }

    /**
     * 授权时的回调方法
     *
     * @param authorizationCode 授权码
     * @param authorizationInfo 授权信息
     */
    default void createAuthorizationCodeCallback(@NonNull String authorizationCode,
                                                 @NonNull AuthorizationInfo authorizationInfo) {
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