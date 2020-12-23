# 风影院 H5版本

![Build And Upload COS](https://github.com/CodeByZack/kongtv-react/workflows/Build%20And%20Upload%20COS/badge.svg)


换了ios手机，之前看做的看视频的app只有安卓版本的。由于iosApp开发的条件限制，暂时先做一个H5的用用。

如果喜欢APP，可以试试[安卓版本](https://github.com/CodeByZack/kongtv-android)，暂时没有IOS。

## 使用

[线上地址](https://movie.zackdk.top/)

IOS手机，请添加到主屏幕使用，体验更好！！！

基本功能已开发完。

支持电视剧、电影、动漫、综艺四个大类节目。

可根据年份、地区进行详细筛选。

支持关键字模糊搜索，以及搜索历史。

首页推荐每天自动爬取爱奇艺电视剧、电影、动漫、综艺排行前六。

支持日间/夜间模式切换。

支持观看历史记录。

支持PWA，可添加到桌面使用。

技术栈: react、react-hook、 unstate-next、 react-router、 material-ui 


## 运行项目

### 本地

``` 
git clone https://github.com/CodeByZack/kongtv-react 

npm i

npm run start
```

### 打包

`npm run build`用于github action自动构建,请勿使用。

请使用`npm run build-dev`。


## 问题记录
开发过程中，一些配置问题的[记录（待整理）](https://www.yuque.com/zackdk/web/an8i5p)。

## ~~todo~~

~~删除redux相关，使用unstated-next~~

~~删除antd-mobild~~

~~使用material ui~~

~~添加PWA支持（IOS需要手动添加到主屏幕）~~

~~增加本地观看记录~~

~~增加分类~~

~~优化体验,增加夜间模式~~

## gif预览

![gif预览](https://apks-1252514056.cos.ap-chengdu.myqcloud.com/demo.gif)


## 截图预览（old）

![首页](https://apks-1252514056.cos.ap-chengdu.myqcloud.com/%E9%A6%96%E9%A1%B5web.png)

![详情页](https://apks-1252514056.cos.ap-chengdu.myqcloud.com/%E8%AF%A6%E6%83%85web.png)

![播放页](https://apks-1252514056.cos.ap-chengdu.myqcloud.com/%E6%92%AD%E6%94%BE-web.png)