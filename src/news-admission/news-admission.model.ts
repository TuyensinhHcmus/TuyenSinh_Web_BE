import * as mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

export const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    news_date: { type: String, required: true },
    slug: { type: String, slug: "title", unique: true },
});

export interface NewsAdmission extends mongoose.Document {
    _id: string;
    title: string;
    news_date: string;
    content: string;
    slug: string;
}
