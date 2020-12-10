import { Profile } from './../../core/models/profile.model';
import { User } from 'src/app/core/models';
import { Dto, RawFormValue } from './../../core/models/dto';
import { SuccessApiResponse } from './../../http/api-reponse.model';

export interface ProfileFormData extends RawFormValue{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    date_of_birth: string,
    phone: string,
    gender: number
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
            gender: rawData.data.profile.gender
        }
    }
    fromFormToRawData(data: ProfileFormData): Profile {
        return {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            date_of_birth: data.date_of_birth,
            gender: data.gender,
            phone: data.phone
        }
    }
    
}