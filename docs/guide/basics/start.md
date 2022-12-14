# 所有注解

[[toc]]



## 所有的注解以及它的作用简述

> 开始先把所有注解的作用和作用范围列出来，在不记得的时候可以来查看

| 注解名                                                 | 用途                                                                                                                        | 作用范围                                                     |
| ------------------------------------------------------ |---------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------------ |
| <span class="annotation">Certificated</span>       | 被标记的类以及被标记的方法在被访问时会验证登录。若未登录返回异常                                                                                          | Spring代ro（以下简称bean）、bean对象里的方法（包括但不限于RequestMapping标记的方法） |
| <span class="annotation">AuthRequireLogin</span>   | 此注解等同<span class="annotation">Certificated</span>，只是一个别名                                                              |                                                              |
| <span class="annotation">Auth</span>               | 被标记过的**类里面的所有方法**需要满足指定的权限规则。被标记的方法需要满足指定的权限规则。否则返回异常                                                                     | controller、Mapping方法、bean、bean里面的方法                |
| <span class="annotation">Roles</span>              | <span class="annotation">Auth</span>的简化写法，只对Role做限制时可以用<span class="annotation">@Roles</span>。作用于controller上表示这里面的所有mapping都生效 | controller、Mapping方法、bean、bean里面的方法                |
| <span class="annotation">Perms</span>              | <span class="annotation">Auth</span>的简化写法，只对Permission做限制时可以用<span class="annotation">@Perms</span>。作用于controller上表示这里面的所有mapping都生效 | controller、Mapping方法、bean、bean里面的方法                |
| <span class="annotation">AuthParam</span>          | 指定用户访问参数需要某些权限，或者访问某些资源需要某些权限                                                                                             | Mapping方法里面的参数上                                      |
| <span class="annotation">BatchAuthParam</span>     | 批量的使用<span class="annotation">AuthParam</span>                                                                        | Mapping方法里面的参数上                                      |
| <span class="annotation">AuthData</span>           | 对从数据库获得的资源进行权限过滤。通过指定的权限规则以及数据过滤规则（condition），进行**<u>数据行权限</u>**的过滤                                                       | Mapper映射的实体类上                                         |
| <span class="annotation">BatchAuthParam</span>     | 批量的使用<span class="annotation">AuthData</span>                                                                         | Mapper映射的实体类上                                         |
| <span class="annotation">ArgResource</span>        | 数据权限中condition，以及参数权限里面的资源（尽量是无参方法）                                                                                       | bean的方法、任意静态方法                                     |
| <span class="annotation">AuthzResourcesScan</span> | <span class="annotation">ArgResource</span>扫描的范围                                                                      | 启动类、注解类上                                             |
| <span class="annotation">Arg</span>                | 数据权限<span class="annotation">AuthData</span>，以及参数权限里面的资源的参数、名字为<span class="annotation">ArgResource</span>指定的名字   | AuthData注解的参数，目前不支持用于AuthParam里，所以尽量用无参方法 |
| <span class="annotation">AuthField</span>          | 对从**数据库**获得的资源进行权限过滤。被标记的**<u>字段</u>**需要某种**权限**、或者**登录**才能查看                                                             | Mapper映射的实体类的字段上                                   |
| <span class="annotation">Decrypt</span>            | 默认为RSA解码器，可以对前端加密的数据进行自动解密。并且可以指定解密其中的json里面的某个字段或某几个字段                                                                   | Mapping方法的参数上                                          |
| <span class="annotation">IPRangeLimit</span>       | 限制访问接口的ip范围（网段限制），作用于controller上表示这里面的所有mapping都生效                                                                        | controller、Mapping方法                                      |
| <span class="annotation">RateLimit</span>          | 限制访问接口的ip请求速率，同时具有封禁功能。作用于controller上表示这里面的所有mapping都生效                                                                   | controller、Mapping方法                                      |
| <span class="annotation">OAuthScope</span>         | **OpenAuth2.0**开启时使用，被标记的类里面的方法，被标记的方法需要某种授权访问                                                                            | controller、Mapping方法、bean、bean的方法                    |
| <span class="annotation">OAuthScopeBasic</span>    | 同OAuthScope，scope默认为basic                                                                                                 | controller、Mapping方法、bean、bean的方法                    |
| <span class="annotation">AuthRequestToken</span>   | 在访问时以参数名、header、cookie等方式传递accessToken。可用于**OpenAuth2.0**或者普通模式                                                           | controller、Mapping方法                                      |



::: tip 补充

当然也可以不用注解的方式。AuHelper里的 AuHelper.[ hasRole 、 hasPermission 、 hasScope 、 isLogin 、 getUserId ]等方法也能让你在**其他地方进行权限判断**而不仅限于上面的范围

:::
