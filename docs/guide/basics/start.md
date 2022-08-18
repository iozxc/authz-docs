# 所有注解

[[toc]]



## 所有的注解以及它的作用简述

> 开始先把所有注解的作用和作用范围列出来，在不记得的时候可以来查看

| 注解名                                                 | 用途                                                         | 作用范围                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <span style='color: #9e880d'>Certificated</span>       | 被标记的类以及被标记的方法在被访问时会验证登录。若未登录返回异常。 | Spring代ro（以下简称bean）、bean对象里的方法（包括但不限于RequestMapping标记的方法） |
| <span style='color: #9e880d'>AuthRequireLogin</span>   | 此注解等同<span style='color: #9e880d'>Certificated</span>，只是一个别名 |                                                              |
| <span style='color: #9e880d'>Auth</span>               | 被标记过的**类里面的所有方法**需要满足指定的权限规则。被标记的方法需要满足指定的权限规则。否则返回异常。 | controller、Mapping方法、bean、bean里面的方法                |
| <span style='color: #9e880d'>Roles</span>              | <span style='color: #9e880d'>Auth</span>的简化写法，只对Role做限制时可以用<span style='color: #9e880d'>@Roles</span>。作用于controller上表示这里面的所有mapping都生效 | controller、Mapping方法、bean、bean里面的方法                |
| <span style='color: #9e880d'>Perms</span>              | <span style='color: #9e880d'>Auth</span>的简化写法，只对Permission做限制时可以用<span style='color: #9e880d'>@Perms</span>。作用于controller上表示这里面的所有mapping都生效 | controller、Mapping方法、bean、bean里面的方法                |
| <span style='color: #9e880d'>AuthParam</span>          | 指定用户访问参数需要某些权限，或者访问某些资源需要某些权限   | Mapping方法里面的参数上                                      |
| <span style='color: #9e880d'>BatchAuthParam</span>     | 批量的使用<span style='color: #9e880d'>AuthParam</span>      | Mapping方法里面的参数上                                      |
| <span style='color: #9e880d'>AuthData</span>           | 对从数据库获得的资源进行权限过滤。通过指定的权限规则以及数据过滤规则（condition），进行**<u>数据行权限</u>**的过滤。 | Mapper映射的实体类上                                         |
| <span style='color: #9e880d'>BatchAuthParam</span>     | 批量的使用<span style='color: #9e880d'>AuthData</span>       | Mapper映射的实体类上                                         |
| <span style='color: #9e880d'>ArgResource</span>        | 数据权限中condition，以及参数权限里面的资源（尽量是无参方法） | bean的方法、任意静态方法                                     |
| <span style='color: #9e880d'>AuthzResourcesScan</span> | <span style='color: #9e880d'>ArgResource</span>扫描的范围    | 启动类、注解类上                                             |
| <span style='color: #9e880d'>Arg</span>                | 数据权限<span style='color: #9e880d'>AuthData</span>，以及参数权限里面的资源的参数、名字为<span style='color: #9e880d'>ArgResource</span>指定的名字 | AuthData注解的参数，目前不支持用于AuthParam里，所以尽量用无参方法 |
| <span style='color: #9e880d'>AuthField</span>          | 对从**数据库**获得的资源进行权限过滤。被标记的**<u>字段</u>**需要某种**权限**、或者**登录**才能查看。 | Mapper映射的实体类的字段上                                   |
| <span style='color: #9e880d'>Decrypt</span>            | 默认为RSA解码器，可以对前端加密的数据进行自动解密。并且可以指定解密其中的json里面的某个字段或某几个字段 | Mapping方法的参数上                                          |
| <span style='color: #9e880d'>IPRangeLimit</span>       | 限制访问接口的ip范围（网段限制），作用于controller上表示这里面的所有mapping都生效 | controller、Mapping方法                                      |
| <span style='color: #9e880d'>RateLimit</span>          | 限制访问接口的ip请求速率，同时具有封禁功能。作用于controller上表示这里面的所有mapping都生效 | controller、Mapping方法                                      |
| <span style='color: #9e880d'>OAuthScope</span>         | **OpenAuth2.0**开启时使用，被标记的类里面的方法，被标记的方法需要某种授权访问。 | controller、Mapping方法、bean、bean的方法                    |
| <span style='color: #9e880d'>OAuthScopeBasic</span>    | 同OAuthScope，scope默认为basic                               | controller、Mapping方法、bean、bean的方法                    |
| <span style='color: #9e880d'>AuthRequestToken</span>   | **OpenAuth2.0**开启时使用，在访问时可以以参数名、header载体、cookie等方式传递accessToken，然后接受并验证所访问用户是否有足够的scope | controller、Mapping方法                                      |



::: tip 补充

当然也可以不用注解的方式。AuHelper里的 AuHelper.[ hasRole 、 hasPermission 、 hasScope 、 isLogin 、 getUserId ]等方法也能让你在**其他地方进行权限判断**而不仅限于上面的范围

:::


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