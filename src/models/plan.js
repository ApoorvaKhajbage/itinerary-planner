import {Schema,model,models} from 'mongoose';



// {
//     "days": [
//         {
//             "date": "2024-04-05",
//             "hotel": "Park Hyatt Paris - Vendome",
//             "places": [
//                 "Paris Metro"
//             ],
//             "activities": [
//                 "Paris Walking Food Tour with Secret Food Tours"
//             ]
//         },
//         {
//             "date": "2024-04-06",
//             "hotel": "Saint James Paris",
//             "places": [
//                 "The Paris Catacombs"
//             ],
//             "activities": []
//         },
//         {
//             "date": "2024-04-07",
//             "hotel": "Hyatt Paris Madeleine",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-08",
//             "hotel": "Park Hyatt Paris - Vendome",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-09",
//             "hotel": "Saint James Paris",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-10",
//             "hotel": "Hyatt Paris Madeleine",
//             "places": [],
//             "activities": []
//         },
//         {
//             "date": "2024-04-11",
//             "hotel": "Park Hyatt Paris - Vendome",
//             "places": [],
//             "activities": []
//         }
//     ]
// }

const planSchema = new Schema({
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


