import { Model } from 'src/app/core/models/model';
export interface Profile extends Model{
    id: number,
    firstname: string,
    lastname: string,
    date_of_birth?: string,
    phone?: string,
    genderId: number
}