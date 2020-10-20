export interface IStore {
    get(name:string)
    set(name:string, value:any)
    remove(name:string)
}