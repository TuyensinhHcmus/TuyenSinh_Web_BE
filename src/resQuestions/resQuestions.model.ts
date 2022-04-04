import * as mongoose from 'mongoose';

export const ResQuestionsSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

export interface ResQuestion extends mongoose.Document {
    _id: string;
    question: string;
    answer: string;
}
