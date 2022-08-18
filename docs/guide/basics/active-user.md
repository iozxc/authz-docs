# 【在线｜活跃】用户

[[toc]]

由于并没有连接websocket，所以这里的在线是**伪在线**。在线用户指的是近期活跃用户

## 1. 得到活跃用户的人数

::: info API

```java
int getNumberOfActiveUser([@NonNull {String｜long} time]);
```

- **参数**
  - <u>time</u> [<u>可选</u>] 时间范围，默认为60秒
- **返回**
  - 活跃用户的人数

:::

## 2. 得到活跃用户的id列表

::: info API

```java
int getActiveUserIdList([@NonNull {String｜long} time]);
```

- **参数**
  - <u>time</u> [<u>可选</u>] 时间范围，默认为60秒
- **返回**
  - 活跃用户的id列表

:::

## 3. 判断某用户是否活跃

::: info API

```java
boolean checkUserIsActive(@NonNull Object userId, [@NonNull {String｜long} time]);
```

- **参数**
  - <u>userId</u> 用户id
  - <u>time</u> [<u>可选</u>] 时间范围，默认为60秒
- **返回**
  -  某用户是否活跃 true表示活跃

:::



## 4. 得到所有活跃的设备

::: info API

```java
List<DeviceDetails> getActiveDevices([@NonNull {String｜long} time]);
```

- **参数**
  - <u>time</u> [<u>可选</u>] 时间范围，默认为60秒
- **返回**
  - 得到所有活跃的设备

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