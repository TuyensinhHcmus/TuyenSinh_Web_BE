import * as mongoose from 'mongoose';

export const TuitionSchema = new mongoose.Schema({
  tuitionMajorId: { type: String, required: true },
  tuitionFee: { type: String, required: true },
  tuitionFeeIncRate: { type: String, required: true },
  tuitionDocumentary: { type: String, required: true },
}, {
  versionKey: false,
});

export interface Tuition extends mongoose.Document {
  _id: string;
  tuitionMajorId: string,
  tuitionFee: string,
  tuitionFeeIncRate: string,
  tuitionDocumentary: string
}
