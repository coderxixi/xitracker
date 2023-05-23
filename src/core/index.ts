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

  //事件捕获器
  private  captrueEvent<T>(mouseEventList:string[],targetkey:string,data?:T){
    mouseEventList.forEach((e)=>{
      window.addEventListener(e,()=>{
        console.log('监听到了');
        
      })
    })

  }
  private installTracker(){
     if(this.data.historyTracker){
       this.captrueEvent(['pushState', 'replaceState','popState'],'histtory-pv')
     }
  }
}
