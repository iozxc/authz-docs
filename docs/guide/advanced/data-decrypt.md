# 请求参数的数据解密和自定义解码器



## 1. 请求参数的数据解密

@Decrypt使用

- 对于`@Decrypt` 可以对**请求的对象进行解密功能**，同时支持**解密对象内某一个字段**或者对**整体解密**，以及**参数解密**

```java{2,7}
@GetMapping("/get")
public Result get(@Decrypt String name){
     return Result.SUCCESS.data("name",name);
}

@PostMapping("/post")
public Result post(@Decrypt({"name", "content", "obj.name"}) @RequestBody HashMap<String, Object> map){
     return Result.SUCCESS.data("map",map);
}
```

> 对于解密对象，若`@Decrypt`无参，则key无限制,但值必须为整个加密的json，如
>
> ```json
> {
>   "key名无限制": "value为整个json加密后的值，包含 `{` `}`"
> }
> ```



## 2. 自定义解码器

Authz内默认用的是rsa解码器，这种解码需要前端来获取Authz的rsa公钥，如果你使用的不是rsa来进行数据加密解密，那么可以自定义解码器。如下。

这样在以上注解解码时，会调用你的解码器

```java{2,4}
@Component
public class CustomDecryptor implements Decryptor {
    @Override
    public String decrypt(String encryptText) {
        // encryptText 解密前的信息 ==> 你的解密逻辑 ==> "解密后的信息"
        return "解密后的信息";
    }
}
```



若配置了多个，则需要特别的只出，如

```java{2}
@GetMapping("/get")
public Result get(@Decrypt(decryptor = CustomDecryptor.class) String name){
     return Result.SUCCESS.data("name",name);
}
```
