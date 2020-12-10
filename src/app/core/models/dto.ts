import { Model } from './model';
export interface RawFormValue {

}
export interface Dto {
    fromRawToFormData(data: any): RawFormValue
    fromFormToRawData(data: any): Model
}