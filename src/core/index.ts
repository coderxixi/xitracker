import { Defaultoptions, TrackerConfig, Options } from "../types/index"
import { createHistoryEvent } from "../utils/pv";
//事件
const enveList:string[]=['click','dblclick','contextmenu','mousedowm','mouseup','mouseenter','mouseout']
export default class Tracker {
  public data: Options;
  constructor(options: Options){
    console.log('optp');
    
    this.data = Object.assign(this.initDef(),options) 
    this.installTracker()
  }
  //初始化
  private initDef(): Defaultoptions{
    window.history['pushState']=createHistoryEvent('pushState');
    window.history['replaceState'] = createHistoryEvent('replaceState');
    return <Defaultoptions>{
      historyTracker: false,
      hashTracker: false,
      sdkVersion: TrackerConfig.version,
      jsErrir: false,
      domTracker:false
    }
  }
  //手动上报
  public sendTracker<T>(data:T){
    this.reportTracker(data)
  }

  //自动上报
  private  captrueEvent<T>(mouseEventList:string[],targetkey:string,data?:T){
    mouseEventList.forEach((e)=>{
      window.addEventListener(e,()=>{
        console.log('监听到了');
        this.reportTracker({
          e,
          targetkey,
          data
        })
      })
    })

  }
  //dom元素上报

  private targetKeyReport(){
    enveList.forEach((ev)=>{
      window.addEventListener(ev,(e)=>{
        const target=e.target as HTMLElement;
        const targetkey = target.getAttribute('target-key');
        if (targetkey){
          this.reportTracker({
            e:ev,
            targetkey,
            
          })
        }
      })
    })
  }
  private installTracker(){
    console.log('asfasf');
    
     if(this.data.historyTracker){
       this.captrueEvent(['pushState', 'replaceState','popState'],'histtory-pv')
     }
     if(this.data.hashTracker){
       this.captrueEvent(['hashchange'], 'hash-pv')
     }
     if(this.data.domTracker){
      this.targetKeyReport()
     }
     if(this.data.jsErrir){
       this.errorEvent()
     }
  }
 //设置用户自定义 uuid
  public setUserID<T extends Defaultoptions['uuid']>(uuid:T){
      this.data.uuid=uuid;
  }
//设置用户自定义 extra
  public setExtra<T extends Defaultoptions['extra']>(extra:T){
           this.data.extra=extra
  }

  private reportTracker<T>(data:T){
    const params=Object.assign(this.data,data,{time:new Date().getTime()});
    let headers={
      type:'application/x-www-form-urlencoded'
    }
    let blob = new Blob([JSON.stringify(params)], headers);
    navigator.sendBeacon(this.data.requestUrl,blob)

  }
  //js报错上传
  private errorEvent(){
    window.addEventListener('error',(e)=>{
    this.reportTracker({
      e:'error',
      targetKey:'message',
      message:e.message
    })
    })
  }
  // promise报错

  private promiseReject(){
    window.addEventListener('unhandledrejection',(e)=>{
       e.promise.catch((error)=>{
         this.reportTracker({
           e: 'promise',
           targetKey: 'message',
           message: error
         })
       })
    })
  }

  //搜集

  private jsError(){
    this.errorEvent();
    this.promiseReject()
  }
}
