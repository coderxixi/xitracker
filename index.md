## pv 页面访问量 用户每次对网站的访问均被记录

主要监听history 和hash

histoty 无法通过popState监听 pushState replaceState 只能重写其函数在utils/pv hash使用hashchange监听

## uv 独立访客 访问网站的一台电脑客户端为一个访客

用户的唯一表示可以在登录之后通过接口返回的ID 进行设置


###  如何上报
为什么要使用navigator.senBeacon上报
这个上报机制跟XML Httprequest对比navigator.senBeacon 即使页面关闭了也会完成请求


DOM监听
主要是给需要监听的元素添加一个属性 用来区分是否需要监听target-key