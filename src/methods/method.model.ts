import * as mongoose from 'mongoose';

export const MethodSchema = new mongoose.Schema({
  methodName: { type: String, required: true },
  methodContent: { type: String, required: true },  
  methodImage: { type: String, required: true },
}, {
  versionKey: false,
});

export interface Method extends mongoose.Document {
  _id: string;
  methodName: string; 
  methodContent: string;  
  methodImage: string;
}
