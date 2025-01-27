const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port= 8082;
const MONGO_URL ="mongodb://localhost:27017/Restora";

const Listing= require("../models/listing.js");

main()
    .then(()  =>{
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));
    
async function main() {
    await mongoose.connect(MONGO_URL);
}


app.get('/', (req, res) =>{
    res.send('Hi i am root!');
});

app.get('/testlisting', async (req, res) => {
    try {
        let sampleListing = new Listing({
            title: "my new Villa",
            description: "This is my beautiful villa in the city center.",
            price: 1000000,
            location: "New York",
            country: "USA",
        });
        console.log("Sample Listing Created: ", sampleListing);

        // Save the document
        await sampleListing.save();
        console.log("Sample was saved to the database.");
        res.send('Listing added successfully');
    } catch (err) {
        console.error("Error saving listing: ", err);
        res.status(500).send('Failed to save listing');
    }
});
exports.MONGO_URL = MONGO_URL;
app.listen(port, (req,res) =>{
    console.log(`Server is running on port ${port}`);
});