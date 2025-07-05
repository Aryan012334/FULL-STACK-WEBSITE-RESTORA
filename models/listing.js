// // //we will export this lisitng model in app.js 

// // const mongoose = require('mongoose');
// // const Schema= mongoose.Schema;

// // const listingSchema = new Schema({
// //     title: {
// //         type: String,
// //         required: true,
// //         maxlength: 100,
// //     },
// //     description: String,
// //     image: {
// //         type: String,
// //         default: "https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-YIMXYjQoBBU",
// //         //if img is undefined or null, use the default, we set this for client/user while working with frontend
// //         set: (v) => v === "" ? "https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-YIMXYjQoBBU" :v,
// //         //i img set but link empty
// //         // match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/,
// //     },
// //     price: Number,
// //     location: String,
// //     country: String,
// // });
// //using this schema we create a model
// // const Listing = mongoose.model('Listing', listingSchema);
// // module.exports = Listing;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        default: "No description provided",
    },
    // image: {
    //     type: {
    //         filename: {
    //             type: String,
    //             default: "default-image",
    //         },
    //         url: {
    //             type: String,
    //             required: [true, 'Image URL is required'],
    //             default: "https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-YIMXYjQoBBU",
                
    //         },
    //     },
    //     default: () => ({
    //         filename: "default-image",
    //         url: "https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-YIMXYjQoBBU",
    //     }),
    // },
    image: {
        url: {
            type: String,
            required: [true, 'Image URL is required'],
            default: "https://unsplash.com/photos/brown-wooden-house-near-green-trees-during-daytime-YIMXYjQoBBU",
        },
        filename: {
            type: String,
            default: "default-image",
        },
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
}, { timestamps: true });

// Create and export the model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;




