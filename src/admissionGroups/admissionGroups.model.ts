import * as mongoose from 'mongoose';

export const AdmissionGroupsSchema = new mongoose.Schema({
  idGroup: { type: String, required: true },
  nameGroup: { type: String, required: true },  
});

export interface AdmissionGroups
{
  idGroup: string; 
  nameGroup: string;  
}
