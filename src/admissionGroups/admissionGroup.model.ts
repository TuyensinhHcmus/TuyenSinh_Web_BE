import * as mongoose from 'mongoose';

export const AdmissionGroupSchema = new mongoose.Schema({
  idGroup: { type: String, required: true },
  nameGroup: { type: String, required: true },  
});

export interface AdmissionGroup extends mongoose.Document {
  id: string;
  idGroup: string;
  nameGroup: string;
}
