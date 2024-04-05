import mongoose, {Schema,model,models} from 'mongoose';
import User from '@/models/userModel'

// ad user as foreign key to planSchema

const planSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    destination: {type:String},
    startDate: {type:Date},
    endDate: {type:Date},
    budget: {type:String},
    travelType: {type:String},
    numAdults: {type:String},
    numChildren: {type:String},
    days:[
        {
            date: {type:Date},
            hotel: {type:String},
            places: [{type:String}],
            activities: [{type:String}]
        }
    ]
});

export default models.Plan || model('Plan',planSchema);

