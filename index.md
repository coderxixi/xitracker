## pv 页面访问量 用户每次对网站的访问均被记录

主要监听history 和hash

histoty 无法通过popState监听 pushState replaceState 只能重写其函数在utils/pv hash使用hashchange监听

## uv 独立访客 访问网站的一台电脑客户端为一个访客

用户的唯一表示可以在登录之后通过接口返回的ID 进行设置