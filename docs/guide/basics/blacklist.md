# 黑名单管理

[[toc]]



## 1. 封禁某个IP

### 1.1 封禁指定时间

::: info 封禁指定时间

```java
void denyIP(@NonNull String ip, @NonNull long ms)
```

- 说明

  >  封禁某ip多少毫秒
  >
  > 重复调用即修改

- 参数
  - <u>ip</u> 需要封禁的ip
  - <u>ms</u> 需要封禁的毫秒数

::: 

封禁ip为`127.0.0.1`的用户1秒，注意别把自己封了（封错的话可以去dashboard修改）

```java
AuHelper.denyIP("127.0.0.1", TimeUnit.SECONDS.toMillis(1));
```

### 1.2 封禁到某个日期结束

::: info 封禁到日期

```java
void denyIP(@NonNull String ip, @NonNull Date date)
```

- 说明

  > 封禁某ip到多久结束
  >
  > 重复调用即修改

- 参数
  - <u>ip</u> 需要封禁的ip
  - <u>date</u> 到期日期

::: 

封禁ip为`127.0.0.1`的用户1秒

```java
AuHelper.denyIP("127.0.0.1", new Date(new Date().getTime() + 1000));
```



## 2. 封禁某个网段

### 2.1 封禁指定时间

::: info 封禁指定时间

```java
void dedenyIPRangenyIP(@NonNull String ipRange, @NonNull long ms)
```

- 说明

  >  封禁某网段多少毫秒
  >
  > 重复调用即修改

- 参数
  - <u>ipRange</u> 需要封禁的网段
  - <u>ms</u> 需要封禁的毫秒数

::: 

封禁ip为`127.0.0.1`的用户1秒，注意别把自己封了（封错的话可以去dashboard修改）

```java
AuHelper.denyIPRange("127.0.0.1/32", TimeUnit.SECONDS.toMillis(1));
```

### 2.2 封禁到某个日期结束

::: info 封禁到日期

```java
void denyIPRange(@NonNull String ipRange, @NonNull Date date)
```

- 说明

  > 封禁某网段到多久结束
  >
  > 重复调用即修改

- 参数
  - <u>ipRange</u> 需要封禁的网段
  - <u>date</u> 到期日期

::: 

封禁ip为`127.0.0.1`的用户1秒

```java
AuHelper.denyIPRange("127.0.0.1/32", new Date(new Date().getTime() + 1000));
```



## 3. 封禁某个用户 &  封禁某个设备

用法同封禁ip和iprange

### 3.1 封禁某用户

::: info 封禁某用户

```java
void denyUser(@NonNull Object userId, @NonNull {Date|long} var)
```

- 说明

  > 封禁某用户
  >
  > 重复调用即修改

- 参数
  - <u>userId</u> 需要封禁的用户id
  - <u>var</u> 到期日期或者持续时间

::: 

### 3.2 封禁某设备

::: info 封禁某设备

```java
void denyDevice(@NonNull Object userId, @NonNull String deviceType [, @Nullable String deviceId,] 
                @NonNull {Date|long} var) 
```

- 说明

  > 封禁某设备
  >
  > 重复调用即修改

- 参数
  - <u>userId</u> 需要封禁设备的用户id
  - <u>deviceType</u> 需要封禁设备的类型
  - <u>deviceId</u> 需要封禁设备的id
  - <u>var</u> 到期日期或者持续时间

::: 



## 4. 移除封禁

```java
AuHelper.removeDenyIP("127.0.0.1"); // 移除ip封禁
AuHelper.removeDenyIPRange("127.0.0.1/32"); // 移除iprange封禁
AuHelper.removeDenyUser(1);  // 移除用户封禁
AuHelper.removeDenyDevice(1,"macOS","FFFFFFFF-FFFF-FFFF");  // 移除设备封禁
```
