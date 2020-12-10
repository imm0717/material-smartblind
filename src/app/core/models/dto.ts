import { SuccessApiResponse } from 'src/app/http/api-reponse.model';
import { Model } from './model';
export interface RawFormValue {

}
export interface Dto {
    fromRawToFormData(data: SuccessApiResponse<Model>): RawFormValue
    fromFormToRawData(data: RawFormValue): Model
}