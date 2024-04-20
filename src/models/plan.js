import mongoose, { Schema, model, models } from 'mongoose';
import User from '@/models/userModel';

const planSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    budget: { type: String },
    travelType: { type: String },
    numAdults: { type: String },
    numChildren: { type: String },
    // photo: { type: String }, // Image URL field
    days: [
        {
            date: { type: Date },
            hotel: { type: String },
            places: [{ type: String }],
            activities: [{ type: String }]
        }
    ]
});
const Plan = models.plans || model('plans', planSchema);
export default Plan;
