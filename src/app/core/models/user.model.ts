import { Model } from './model';
import { Profile } from './profile.model';

export interface User extends Model{
    id: number
    email: string
    password: string
    profile: Profile
}