const express= require('express');
const app= express();
const mongoose= require('mongoose');
const port= 8088;
const MONGO_URL ="mongodb://localhost:27017/Restora";
const path= require('path');

const Listing= require("./models/listing.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
main()
    .then(()  =>{
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));
    
async function main() {
    await mongoose.connect(MONGO_URL);
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) =>{
    res.send('Hi i am root!');
});

// app.get('/testlisting', async (req, res) => {
//     try {
//         let sampleListing = new Listing({
//             title: "my new Villa",
//             description: "This is my beautiful villa in the city center.",
//             price: 1000000,
//             location: "New York",
//             country: "USA",
//         });
//         console.log("Sample Listing Created: ", sampleListing);

//         // Save the document
//         await sampleListing.save();
//         console.log("Sample was saved to the database.");
//         res.send('Listing added successfully');
//     } catch (err) {
//         console.error("Error saving listing: ", err);
//         res.status(500).send('Failed to save listing');
//     }
// });

//Index route
app.get("/listings", async (req, res) => {
    // Listing.find({}).then((req,res) =>{
    //     console.log(res);
    // })
    // Fetch all listings from the database and render them in the listings/index.ejs view.  // or this same let allListings = await Listing.find(); res.render("listings/index.ejs",{allListings});
    try {
        let allListings = await Listing.find();
        res.render("listings/index.ejs",{allListings});
    } catch (err) {
        console.error("Error fetching listings: ", err);
        res.status(500).send('Failed to fetch listings');
    }
})
//new route

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});   ///thsii new will act like id if kept after show route so we keep it before

//show route

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
    // try {
    //     let listing = await Listing.findById(req.params.id);
    //     res.render("listings/show.ejs",{listing});
    // } catch (err) {
    //     console.error("Error fetching listing: ", err);
    //     res.status(404).send('Listing not found');
    // }
});



// create route

app.post("/listings", async (req, res) => {
    // let {title, description,image, price, location, country} = req.body;
    //we can do this or we can make the title desc ...  as object field or obj key when we submit the new.ejs
    //now we can usee
    // let listing= req.body.listing;   //..req.body will give nested obj .lsiting will give tge exact obj
    //we can create the instance of new listing also
    // console.log(listing);
    const newListing =new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
    // try {
    //     let newListing = new Listing({title, description, price, location, country});
    //     await newListing.save();
    //     res.redirect("/listings");
    // } catch (err) {
    //     console.error("Error saving listing: ", err);
    //     res.status(500).send('Failed to save listing');
    // }
});
exports.MONGO_URL = MONGO_URL;
app.listen(port, (req,res) =>{
    console.log(`Server is running on port ${port}`);
});

                                                                                                                                                                                                                                                                                                                                                                                                      