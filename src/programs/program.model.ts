import * as mongoose from 'mongoose';

export const ProgramSchema = new mongoose.Schema({
  programName: { type: String, required: true },
}, {
  versionKey: false,
});

export interface Program extends mongoose.Document {
  _id: string;
  programName: string; 
}