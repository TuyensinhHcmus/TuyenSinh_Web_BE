import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName: {type: String},
    userPhone: {type: String},
    userEmail: {type: String, unique: true},
    userRole: {type: String},
    userIsBlock: {type: Boolean},
    userPassword: {type: String},
    userType: {type: String},
    userAvatar: {type: String},
    refreshToken: {type: String},
})

export interface User {
    userId: string,
    refreshToken: string,
    userName: string,
    userPhone: string,
    userEmail: string,
    userRole: string,
    userIsBlock: boolean,
    userPassword: string,
    userType: string,
    userAvatar: string,
}