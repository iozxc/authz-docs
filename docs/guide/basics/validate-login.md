# 登录验证 & 登录拦截

[[toc]]

上文以及讲到了如何登录以及退出登录的相关操作，下面来介绍登录之后如何给自己的接口、方法加上登录验证以及拦截未登录用户。



先从一个例子入手

对与账单操作，每个操作都需要登录验证，比如创建账单 、查询所有账单、删除账单等。

所以可以在这些接口上加上@AuthRequireLogin便可以在用户访问此接口时进行登录验证，若非登录，将返回异常

## 1. 接口方法上使用

```java{8,14,24}
@RestController
@RequestMapping("/bill")
public class BillController {

    @Autowired
    private BillService billService;

    @AuthRequireLogin
    @PostMapping("/create")
    public Result<Bill> createBill(...) {
        // ...
    }

    @AuthRequireLogin
    @GetMapping("/list")
    public Result<List<Bill>> listBill(...) {
        // ...
    }

    @GetMapping("/delete")
    public Result<Void> deleteBill(...) {
       // 验证此次请求是否登录  等价于@AuthRequireLogin之前的登录验证
       // 不过不会进行异常返回，这个时候需要自定义返回
       if (AuHelper.isLogin()) {
             // 成功登录...
       }
    }

}
```

## 2. Controller上使用

当然这样做太复杂了，所以支持在controller上添加@AuthRequireLogin，对所有接口都进行登录拦截

```java{3}
@RestController
@RequestMapping("/bill")
@AuthRequireLogin // 等价于在所有@Mapping方法上添加@AuthRequireLogin
public class BillController {
  	
    // ...
    @PostMapping("/create")
    public Result<Bill> createBill(...) {
        // ...
    }

    @GetMapping("/list")
    public Result<List<Bill>> listBill(...) {
        // ...
    }

    @GetMapping("/delete")
    public Result<Void> deleteBill(...) {
			 // ...
    }

}
```

## 3. bean、bean方法上使用

同理，在任意bean上使用，效果一样

```java{1}
@AuthRequireLogin // 等价于在所有方法上添加@AuthRequireLogin
@Service
public class BillService extends ServiceImpl<BillMapper, Bill> implements IBillService {
  	
    // ...
    
    @Override
    public Bill createBill(...) {
        // ...
    }

    @Override
    public List<Bill> listBill(...) {
        // ...
    }

    @Override
    public boolean deleteBill(...) {
			 // ...
    }

}
```

<==>

```java{7,13,19}
 // 等价于在所有方法上添加@AuthRequireLogin
@Service
public class BillService extends ServiceImpl<BillMapper, Bill> implements IBillService {
  	
    // ...
  
    @AuthRequireLogin
    @Override
    public Bill createBill(...) {
        // ...
    }

    @AuthRequireLogin
    @Override
    public List<Bill> listBill(...) {
        // ...
    }

    @AuthRequireLogin
    @Override
    public boolean deleteBill(...) {
			 // ...
    }

}
```



::: tip 补充

成功拦截未登录用户时，给出的异常状态码为 <span class='error-code'>REQUIRE_LOGIN</span>，具体查看[自定义错误拦截器](/guide/advanced/error-handler)

:::

<style>
  .error-code{
    color: red;
    font-weight: 700;
  }
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