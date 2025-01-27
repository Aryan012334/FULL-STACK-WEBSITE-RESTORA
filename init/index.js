const mongoose = require('mongoose');
const initData= require("./data.js");
const Listing= require("../models/listing.js");
const MONGO_URL ="mongodb://localhost:27017/Restora";

main()
    .then(()  =>{
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));
    
async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDB = async () =>{
    await Listing.deleteMany(); //delete if data already exists
    await Listing.insertMany(initData.data);
    //initData is the object and we wanna access the key which is data
    console.log('Database initialized with sample data');




    // const listings = data.map(listing => new Listing(listing));
    // await Listing.insertMany(listings);
}
initDB();

//cd init then inittialise