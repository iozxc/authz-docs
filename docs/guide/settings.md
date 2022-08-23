# 配置

> 所有的配置都在这里，当需要再来查看，后面也会提及

[[toc]]


## 基础配置

| 配置项                  | 说明                                                  | 类型                                       | 默认值             |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------ | ------------------ |
| authz.app               | app名，避免在同一cache中启动多Authz服务导致的数据混乱 | String                                     | defaultApp         |
| authz.banner            | 是否打印banner                                        | boolean                                    | true               |
| authz.log               | authz的日志等级                                       | LogLevel [ DEBUG, INFO, WARN, ERROR, OFF ] | WARN               |
| authz.default-decryptor | 使用`@Decrypt`时的默认的解密器                        | Class<? extends Decryptor>                 | RSADecryptor.class |
| authz.orm               | orm框架 目前仅支持mybatis，数据权限启用               | ORM                                        |                    |

## Token配置

[查看具体使用](/guide/basics/login#_5-登录请求以及token配置（如何使用返回的token，token的过期时间）)

| 配置项                             | 说明                                                         | 类型    | 默认值           |
|---------------------------------| ------------------------------------------------------------ | ------- |---------------|
| authz.token.key                 | 签名的私钥，若长度不够将自动以`.`填充，若为空，将不执行数字签名 | String  |               |
| authz.token.tokenId-bits        | 登录标识的长度                                               | int     | 8             |
| authz.token.cookie-name         | cookie name                                                  | String  | atkn          |
| authz.token.header-name         | header name                                                  | String  | authorization |
| authz.token.header-prefix       | prefix 例如：headerPrefix = 'Bearer' -> "Bearer  " headerPrefix不需要在最后空格，但是在请求时需要空一格 | String  | Bearer        |
| authz.token.access-time         | access token有效时间，默认 7d ，单位 ms                      | String  | 7d            |
| authz.token.refresh-time        | refresh token有效时间，默认 30d ，单位 ms                    | String  | 30d           |
| authz.token.logout-before-login | 在登录前退出，若某请求为申请登录的请求，并且此请求已经登录，那么会将之前的登录移除 | boolean | true          |
| authz.token.bind-ip             | token是否绑定登录的ip。若请求ip与token绑定的ip不相同，token会立即失效 | boolean | false         |

## Cache配置

| 配置项                               | 说明                                                         | 类型    | 默认值 |
| ------------------------------------ | ------------------------------------------------------------ | ------- | ------ |
| authz.cache.enable-redis             | 是否开启redis缓存（双层同步缓存）                            | boolean | false  |
| authz.cache.enable-redis-actuator    | 是否开启redis健康监控检查，默认关闭                          | boolean | false  |
| authz.cache.redis-can-count          | redis每次扫描key的数量                                       | int     | 10000  |
| authz.cache.cache-maximum-size       | 最大缓存数，不配置时默认无大小限制                           | int     |        |
| authz.cache.expire-after-create-time | 在【创建】之后L2Cache存活时间 默认10分钟  单位  ms \|s \|m \|h \|d | String  | 10m    |
| authz.cache.expire-after-update-time | 在【更新】之后L2Cache存活时间 默认10分钟  单位  ms \|s \|m \|h \|d | String  | 10m    |
| authz.cache.expire-after-read-time   | 在【读取】之后L2Cache存活时间 默认10分钟  单位  ms \|s \|m \|h \|d | String  | 10m    |

## UserDevice配置

[查看具体使用](/guide/basics/device-control#_3-登录设备数量管理（全局、任意用户）)

| 配置项                                    | 说明                                                         | 类型                   | 默认值            |
| ----------------------------------------- | ------------------------------------------------------------ | ---------------------- | ----------------- |
| authz.user.maximum-total-device           | 登录设备总数默不做限制【-1为不做限制，最小为1】，超出会挤出最长时间未访问的设备。 | int                    | -1                |
| authz.user.maximum-total-same-type-device | 相当于typesTotal对所有的类型添加一个设备数量限制，会被typesTotal覆盖。 同类型设备最大登录数 默认不做限制（1.2.7之前为限制1个）【-1为不做限制，最小为1】，超出会挤出最长时间未访问的设备。 | int                    | 1                 |
| authz.user.types-total                    | 每[一种、多种]设备类型设置[共同]的最大登录数（最小为1），超出会挤出最长时间未访问的设备。 | List\<DeviceCountInfo> | new ArrayList<>() |

## Dashboard配置

[查看具体使用](/guide/basics/dashboard#_1-dashboard的配置)

| 配置项                                       | 说明                                                         | 类型                                                         | 默认值            |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| authz.dashboard.enabled                      | 是否开启dashboard                                            | boolean                                                      | false             |
| authz.dashboard..users                       | 登录用户，可与username，password共用                         | List\<User> User:username,password,DashboardPermission[]     | new ArrayList<>() |
| authz.dashboard..username                    | 用户名                                                       | String                                                       | authz             |
| authz.dashboard.password                     | 用户密码                                                     | String                                                       | authz             |
| authz.dashboard.permissions                  | 用户拥有的权限，默认为所有，可以设置为API（只能修改API的权限）、PARAMETER（只能修改参数的权限） | DashboardPermission:[API, PARAMETER, DATA_COL, DATA_ROW, RATE, BLACKLIST, OPEN_AUTH, LOGIN, DOCS, REQUEST, ALL] | ALL               |
| authz.dashboard.unresponsive-expiration-time | 未响应过期时间 默认10分钟  单位  ms \|s \|m \|h \|d          | String                                                       | 10m               |
| authz.dashboard.allow                        | 【只允许】的iprange 格式： xx.xx.xx.xx/xx ,  xx.xx.xx.xx/xx  | String                                                       |                   |
| authz.dashboard.deny                         | 拒绝的iprange 格式： xx.xx.xx.xx/xx ,  xx.xx.xx.xx/xx        | String                                                       |                   |

## OpenAuth2.0配置

| 配置项                | 说明                                                         | 类型                                          | 默认值 |
| --------------------- | ------------------------------------------------------------ | --------------------------------------------- | ------ |
| authz.oauth.authorization-code-time | 授权码过期时间 | String                                     | 10m  |
| authz.oauth.default-basic-scope | 默认授予的权限。 通过oauth授权登录的用户拥有的权限，`@OAuthScopeBasic`标识之后的额外scope 通过正常登录的用户不受scope的影响，能访问所有资源 | String                                     | basic |
| authz.oauth.scope-separator | scope分割符 默认空格 | String                  | `  `    |
| authz.oauth.clientId-length | 客户端Id长度 默认24 | int                                           | 24     |
| authz.oauth.client-secret-length | 客户端密钥长度 默认30位 | int                                           | 30     |
| authz.oauth.algorithm | 授权码签名算法 | AuthorizationCodeAlgorithm [SHA_256,SHA1,MD5] | SHA1   |

## 全局IpRange配置

| 配置项                               | 说明                                                       | 类型    | 默认值 |
| ------------------------------------ | ---------------------------------------------------------- | ------- | ------ |
| authz.global-ip-range.allow          | 若配置，则必须在这些范围内 xx.xx.xx.xx/xx , xx.xx.xx.xx/xx | String  |        |
| authz.global-ip-range.deny           | 拒绝访问网段 xx.xx.xx.xx/xx ,  xx.xx.xx.xx/xx              | String  |        |
| authz.global-ip-range.support-native | 0:0:0:0:0:0:0:1 127.0.0.1是否支持                          | boolean | true   |

## RSA配置

| 配置项                            | 说明                                                       | 类型    | 默认值 |
| --------------------------------- | ---------------------------------------------------------- | ------- | ------ |
| authz.rsa.auto                    | 是否开启自动刷新RSA                                        | boolean | true   |
| authz.rsa.rsaKeyRefreshWithPeriod | auto为true时生效 rsa的key刷新时间 单位  ms \|s \|m \|h \|d | String  | 7d     |
| authz.rsa.customPublicKey         | 自定义公钥                                                 | String  |        |
| authz.rsa.custom-private-key      | 自定义私钥                                                 | String  |        |

## 默认Response配置

| 配置项                   | 说明                                                         | 类型    | 默认值 |
| ------------------------ | ------------------------------------------------------------ | ------- | ------ |
| authz.response.always-ok | 返回体状态码是否永远为200、不论是否出错（默认错误拦截器情况下） | boolean | false  |

## 其他配置

| 配置项             | 说明               | 类型 | 默认值 |
| ------------------ | ------------------ | ---- | ------ |
| authz.sys.gc-period | 定期GC时间，为0或为空则关闭 单位  ms \|s \|m \|h \|d |  |       |
| authz.sys.md5check | jar包md5检查       | boolean | false |

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
