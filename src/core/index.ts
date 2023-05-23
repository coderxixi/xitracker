import { Defaultoptions, TrackerConfig, Options } from "../types/index"
import { createHistoryEvent } from "../utils/pv"
export default class Tracker {
  public data: Options;
  constructor(options: Options){
    this.data = Object.assign(this.initDef(),options) 
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
  private installTracker(){
     if(this.data.historyTracker){
       this.captrueEvent(['pushState', 'replaceState','popState'],'histtory-pv')
     }
     if(this.data.hashTracker){
       this.captrueEvent(['hashchange'], 'hash-pv')
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
}
