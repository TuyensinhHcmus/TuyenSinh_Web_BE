import * as mongoose from 'mongoose';

export const MajorSchema = new mongoose.Schema({
  majorFacultyId: { type: String, required: true },
  majorName: { type: String, required: true },
  majorIntroduction: { type: String, required: true },
  majorImageName: { type: String, required: true },
  majorTarget: { type: String, required: true },
  majorAdmissionGroup: { type: String, required: true },
  majorProgram: { type: String, required: true },
}, {
  versionKey: false,
});

export interface Major extends mongoose.Document {
  _id: string;
  majorFacultyId: string,
  majorName: string,
  majorIntroduction: string,
  majorImageName: string,
  majorTarget: string,
  majorAdmissionGroup: string,
  majorProgram: string,
}
