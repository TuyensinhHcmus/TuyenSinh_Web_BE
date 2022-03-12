import * as mongoose from 'mongoose';

export const FacultySchema = new mongoose.Schema({
  facultyName: { type: String, required: true },
  facultyIntroduction: { type: String, required: true },  
  facultyImageCompare: { type: String, required: true },
  facultyImageHighlight: { type: String, required: true },
}, {
  versionKey: false,
});

export interface Faculty extends mongoose.Document {
  _id: string;
  facultyName: string; 
  facultyIntroduction: string;  
  facultyImageCompare: string;
  facultyImageHighlight: string;
}
