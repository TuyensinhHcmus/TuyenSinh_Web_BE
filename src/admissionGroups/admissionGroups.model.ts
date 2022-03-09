import * as mongoose from 'mongoose';

export const AdmissionGroupsSchema = new mongoose.Schema({
  idGroup: { type: String, required: true },
  nameGroup: { type: String, required: true },  
}, {
  versionKey: false,
});

export interface AdmissionGroups
{
  id: string;
  idGroup: string; 
  nameGroup: string;  
}
