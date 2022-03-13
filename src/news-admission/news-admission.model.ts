import * as mongoose from 'mongoose';
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

export const NewsSchema = new mongoose.Schema({
    newsTitle: { type: String, required: true },
    newsContent: { type: String, required: true },
    newsDateCreate: { type: String, required: true },
    slug: { type: String, slug: "newsTitle", unique: true },
});

export interface NewsAdmission extends mongoose.Document {
    _id: string;
    newsTitle: string;
    newsContent: string;
    newsDateCreate: string;
    slug: string;
}
