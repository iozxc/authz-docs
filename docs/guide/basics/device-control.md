# 设备管理

[[toc]]

设备管理是对用户的设备进行**登录、登出、查看、限制登录数量、互斥登录等**一系列操作。



## 1. 登录和退出登录

具体见 [登录&登出](/guide/basics/login)

这里补充几个退出登录的API

::: info API 

在之前的登录登出只能管理本此请求的用户，下面**两个**方法支持退出**任意用户**登录的任意**设备**或者**退出其所有设备**

```java
void logoutAt(@NonNull Object userId [, @NonNull String deviceType, @Nullable String deviceId])
```

- **说明**

  > 注销指定用户所有设备，建议用于管理员，如果某用户想通过自己id注销自己，建议加上参数权限判断
  >
  > 【deviceType】注销指定用户下的的某【**设备类型**】的**所有设备**
  >
  > 【deviceType，deviceId】 注销指定用户下的某【**设备类型和设备id**】的设备

- **参数**
  
  - <u>userId</u> 用户id - 注销指定用户**所有设备**
  - <u>deviceType</u> 设备类型 
  - <u>deviceId</u> 设备id 

::: 

### 1.1 退出**任意用户**的所有设备

```java{4}
@Roles("admin")
@GetMapping("/logout-at")
public String logoutAt(@RequestParam int userId) {
    AuHelper.logoutAt(userId);
    return "ok";
}
```

### 1.2 退出任意用户的任意类型的设备（所有相同类型）

```java{5}
@Roles("admin")
@GetMapping("/logout-at")
public String logoutAt(@RequestParam int userId, @RequestParam String deviceType) {
    AuHelper.logoutAt(userId, deviceType);
    return "ok";
}
```

### 1.3 退出任意用户的任意类型&任意设备Id的设备（某一个）

```java{6}
@Roles("admin")
@GetMapping("/logout-at")
public String logoutAt(@RequestParam int userId, @RequestParam String deviceType, @RequestParam String deviceId) {
    AuHelper.logoutAt(userId, deviceType, deviceId);
    return "ok";
}
```

::: tip

`@Roles("admin")` 是权限拦截注解，具体作用为验证某用户授予的角色是否满足要求，在这里作用的为验证访问此接口的用户是否有admin的角色。具体查看[API权限管理](/guide/basics/api-permission)

```java
@Roles("admin")

~= 约等于
  
if (!AuHepler.hasRole("admin")) {
	throw new PermissionException();
}
```

:::

## 2. 登录设备查询

登录之后的设备可以查询

其中查询出来的设备类型为`DeviceDetails`

**DeviceDetails**一共有10个方法

| 方法名             | 说明                     | 类型         |
| ------------------ | ------------------------ | ------------ |
| getId              | 获得登录标识             | String       |
| getUserId          | 获得用户id               | <自定义类型> |
| getDeviceType      | 获得设备类型             | String       |
| getDeviceId        | 获得设备id               | String       |
| getLastRequestTime | 获得最后一次请求时间     | Date         |
| getLastRequestIp   | 获得最后一次请求ip       | String       |
| isDenyDevice       | 此设备是否被封禁         | boolean      |
| isDenyIp           | 此ip是否被封禁           | boolean      |
| isDenyIpRange      | 此ip是否处于被封禁的网段 | boolean      |
| isDenyUser         | 此用户是否被封禁         | boolean      |

### 2.1 获得<u>所有用户</u><u>所有设备</u>信息

::: info API 

查询所有设备，返回的结果为一个不可修改的Map，其中key为userId，value为该用户所有的设备

```java
@NonNull
Map<Object, List<DeviceDetails>> getAllUserDevices()
```

- **说明**

  > 查询所有用户信息，一个map userId->设备信息列表

::: 

```java{4}
@Roles("admin")
@GetMapping("/get-all-devices")
public Map<Object, List<DeviceDetails>> getAllDevices() {
    return AuHelper.getAllUserDevices();
}
```



### 2.2 获得<u>当前请求用户</u>的设备

::: info API 

```java
@NonNull
List<DeviceDetails> getDevices([@NonNull String deviceType]) throws NotLoginException
```

- **说明**

  > 查询当前访问用户的所有设备
  >
  > 【deviceType】 查询当前访问用户的指定类型的所有设备

- **参数**

  - <u>deviceType</u> [<u>可选</u>] 

- **异常**

  - <u>NotLoginException</u> 当前访问用户未登录，抛出异常

::: 

#### 2.2.1 获得<u>当前请求用户</u>所有设备

```java{4}
@AuthRequireLogin
@GetMapping("/get-devices")
public List<DeviceDetails> getDevices() {
    return AuHelper.getDevices();
}
```

#### 2.2.2 获得当<u>当前请求用户</u>某种类型的所有设备

```java{4}
@AuthRequireLogin
@GetMapping("/get-devices-by-deviceType")
public List<DeviceDetails> getDevices(@RequestParam String deviceType) {
    return AuHelper.getDevices(DeviceType);
}
```

#### 2.2.3 获得<u>当前请求用户</u>的设备

```java{4}
@AuthRequireLogin
@GetMapping("/get-device")
public DeviceDetails getDevice() {
    return AuHelper.getDevice();
}
```



### 2.3 获得<u>任意用户</u>的设备

::: info API 

```java
@NonNull
List<DeviceDetails> getDevicesAt(@NonNull Object userId[, @NonNull String deviceType]) throws NotLoginException
```

- **说明**

  > 查询任意用户的所有设备
  >
  > 【deviceType】 查询任意用户的指定类型的所有设备

- **参数**

  - <u>userId</u> 该用户id
  - <u>deviceType</u> [<u>可选</u>] 

- **异常**

  - <u>NotLoginException</u> 当前访问用户未登录，抛出异常

::: 
#### 2.3.1 获得<u>任意用户</u>所有设备

```java{4}
@Roles("admin")
@GetMapping("/get-device-at")
public List<DeviceDetails> getDeviceAt(@RequestParam int userId) {
    return AuHelper.getDevicesAt(userId);
}
```

#### 2.3.2 获得当<u>任意用户</u>某种类型的所有设备

```java{4}
@Roles("admin")
@GetMapping("/get-device-at")
public List<DeviceDetails> getDeviceAt(@RequestParam int userId, @RequestParam String deviceType) {
    return AuHelper.getDevicesAt(userId, deviceType);
}
```

#### 2.3.3 获得<u>任意用户</u>的设备

```java{4}
@Roles("admin")
@GetMapping("/get-device-at")
public DeviceDetails getDeviceAt(@RequestParam int userId, @RequestParam String deviceType, @RequestParam inStringt deviceId) {
    return AuHelper.getDevice(userId, deviceType, deviceId);
}
```



## 3. 登录设备数量管理（全局、任意用户）

[查看具体配置](/guide/settings#userdevice配置)

### 3.1 <u>所有设备</u>登录总数的限制

::: tip <u>所有设备</u>登录总数的限制

言外之意就是一个用户最多能够登录多少个设备，不管类型和id如何。

:::

此配置可以在yml里配置，也可以在后续通过代码的方式来配置

#### 3.1.1 <u>所有设备</u>登录总数的限制 - yml配置方法（全局）

```yaml
authz:
  user:
    # -1为不做限制，最小为1
    maximum-total-device: 1 # 默认为-1 
```

#### 3.1.2 <u>所有设备</u>登录总数的限制 - 代码配置方法（为每一位用户添加规则）

##### >> **为当前用户添加**

::: info API 

```java
void changeMaximumTotalDevice(int total) throws NotLoginException
```

- **参数**
  - <u>total</u> 总数

- **异常**

  - <u>NotLoginException</u> 当前访问用户未登录，抛出异常

::: 

```java{4}
@AuthRequireLogin
@GetMapping("/change-max-device-total")
public String changeMaximumDeviceTotal(@RequestParam int total) {
    AuHelper.changeMaximumDeviceTotal(total);
    return "ok";
}
```

##### >> **为任意用户添加**

::: info API 

```java
void changeMaximumTotalDeviceAt(@NonNull Object userId, int total) throws NotLoginException
```

- **参数**
  - <u>userId</u> 需要修改的用户id 
  - <u>total</u> 总数

- **异常**

  - <u>NotLoginException</u> 当前访问用户未登录，抛出异常

::: 

```java{4}
@AuthRequireLogin
@GetMapping("/change-max-device-total-at")
public String changeMaximumDeviceTotalAt(@RequestParam int userId, @RequestParam int total) {
    AuHelper.changeMaximumDeviceTotalAt(userId, total);
    return "ok";
}
```




### 3.2 <u>同类型设备</u>总数的限制

::: tip <u>同类型设备</u>总数的限制

对所有设备类型生效。

所有类型的设备最多登录多少个。

如：若此值设置为1，当设备类型为`mac`的设备依次登录两次之后，第一次登录的设备的token（登录令牌）将会无效。

:::

[每一种、多种设备类型总数的限制](/guide/basics/device-control#_3-3-每-一种、多种-设备类型总数的限制) 配置会将此配置覆盖

此配置可以在yml里配置，也可以在后续通过代码的方式来配置

#### 3.2.1 <u>同类型设备</u>总数的限制 - yml配置方法（全局）

```yaml
authz:
  user:
    # -1为不做限制，最小为1
    maximum-total-same-type-device: 1 # 默认为1
```



#### 3.2.2 <u>同类型设备</u>总数的限制 - 代码配置方法（为每一位用户添加规则）
##### >> **为当前用户添加**

::: info API 

```java
void changeMaximumTotalSameTypeDevice(int total) throws NotLoginException
```

- **参数**
  - total 总数

- **异常**

  - NotLoginException 当前访问用户未登录，抛出异常

::: 

```java{4}
@AuthRequireLogin
@GetMapping("/change-max-total-same-type-device")
public String changeMaximumTotalSameTypeDevice(@RequestParam int total) {
    AuHelper.changeMaximumTotalSameTypeDevice(total);
    return "ok";
}
```

##### >> **为任意用户添加**

::: info API 

```java
void changeMaximumTotalSameTypeDeviceAt(@NonNull Object userId, int total) throws NotLoginException
```

- **参数**
  - <u>userId</u> 需要修改的用户id 
  - <u>total</u> 总数

- **异常**

  - <u>NotLoginException</u> 当前访问用户未登录，抛出异常

::: 

```java{4}
@AuthRequireLogin
@GetMapping("/change-max-total-same-type-device-at")
public String changeMaximumTotalSameTypeDeviceAt(@RequestParam int userId, @RequestParam int total) {
    AuHelper.changeMaximumTotalSameTypeDeviceAt(userId, total);
    return "ok";
}
```



### 3.3 <u>每[一种、多种]设备类型</u>总数的限制

::: tip <u>所有设备</u>登录总数的限制

如限制 电脑端、电视端的设备个数一共不超过2个等

:::

此配置可以在yml里配置，也可以在后续通过代码的方式来配置

#### 3.3.1 yml配置方法（全局）

```yaml
authz:
  user:
    types-total:
      - total: 1
        types: ['ios','mac']
```

#### 3.3.2 代码配置方法（为每一位用户添加规则）
##### >> **为当前用户添加**

::: info API 

```java
void addDeviceTypesTotalLimit(@NonNull Collection<String> types, int total) throws NotLoginException
```

- **参数**
  - <u>types</u> 设备类型集合
  - <u>total</u> 总数

:::

Pad类型的设备和Phone类型的设备总数加起来不能超过2个

PC类型的设备不能超过1个

```java{4-5}
@AuthRequireLogin
@GetMapping("/types-total")
public String addDeviceTypesTotal() {
    AuHelper.addDeviceTypesTotalLimit(Arrays.asList("PC"), 1);
    AuHelper.addDeviceTypesTotalLimit(Arrays.asList("Pad", "Phone"), 2);
    return "ok";
}
```

##### >> **为任意用户添加**

::: info API 

```java
void addDeviceTypesTotalLimit(@NonNull Object userId, @NonNull Collection<String> types, int total)
```

- **参数**
  - <u>userId</u> 需要修改的用户id 
  - <u>types</u> 设备类型集合
  - <u>total</u> 总数
  
- **异常**
  - <u>NotLoginException</u> 当前访问用户未登录，抛出异常

::: 

```java{1-2}
AuHelper.addDeviceTypesTotalLimit(1, Arrays.asList("PC"), 1);
AuHelper.addDeviceTypesTotalLimit(1, Arrays.asList("Pad", "Phone"), 2);
```




::: tip 当设备超出设置时，下线规则是怎样的？

每当一个新的设备登录，若此设备触发了上述的规则，那么并不是最先登录的下线，而是按最近访问时间依此踢出访问时间最早的设备。

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