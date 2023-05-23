export const createHistoryEvent = <T extends keyof History>(type:T)=>{
   const origin=history[type];

   return function (){
    const res=origin.apply(this,arguments);
    //创建一个自定义事件
    const e=new Event(type);
    window.dispatchEvent(e)
    return res
   }
}


createHistoryEvent('pushState');


