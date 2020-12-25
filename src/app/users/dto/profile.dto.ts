import { Profile } from './../../core/models/profile.model';
import { Address, User } from 'src/app/core/models';
import { Dto, RawFormValue } from './../../core/models/dto';
import { SuccessApiResponse } from './../../http/api-reponse.model';
import * as moment from 'moment'; 


export interface ProfileFormData extends RawFormValue{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    date_of_birth: string,
    phone: string,
    gender: number,
    address: Address[]
}
export class ProfileDto implements Dto {
    fromRawToFormData(data: SuccessApiResponse<User>): ProfileFormData {
        let rawData = data as SuccessApiResponse<User>
        return {
            id: rawData.data.id,
            firstname: rawData.data.profile.firstname,
            lastname: rawData.data.profile.lastname,
            email: rawData.data.email,
            date_of_birth: rawData.data.profile.date_of_birth,
            phone: rawData.data.profile.phone,
            gender: rawData.data.profile.gender,
            address: rawData.data.address 
        }
    }
    fromFormToRawData(data: ProfileFormData): Profile {
        let result_date = ""
        if (data.date_of_birth){
            let formDate = moment(data.date_of_birth)
            result_date = formDate.format('YYYY-MM-DD')
        }
        return {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            date_of_birth: result_date,
            gender: data.gender,
            phone: data.phone
        }
    }
    
}