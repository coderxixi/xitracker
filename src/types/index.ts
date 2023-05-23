export interface Defaultoptions {
  uuid:string|undefined,
  requestUrl:string|undefined,
  historyTracker:boolean,
  hashTracker:boolean,
  sdkVersion:string|number,
  extra:Record<string,any>|undefined,
  jsErrir:boolean,
  domTracker:boolean
}

export interface Options extends Partial<Defaultoptions>  {
  requestUrl:string
 }
export enum TrackerConfig {
  version='1.0.0'
}