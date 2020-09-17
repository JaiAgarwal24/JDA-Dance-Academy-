const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const bodyparser = require("body-parser");

const app = express();
const port = 8000;


// Define mongoose schema  
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);

// Express Specific Stuff
app.use('/static',express.static('static')); //for serving static files
app.use(express.urlencoded());

// PUG Specific Stuff
app.set('views engine','pug');//set template engine as pug
app.set('views',path.join(__dirname,'views'));//set the view directory

// EndPoints
app.get('/',(req,res)=>{
    const params = {'title':'Jai Dance Academy' };
    res.status(200).render('home.pug',params);
    });

app.get('/contact',(req,res)=>{
    const params = {'title':'Jai Dance Academy' };
    res.status(200).render('contact.pug',params);
    });

app.post('/contact',(req,res)=>{
    const myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
    });

// Start The Server
app.listen(port,()=>{
    console.log(`The application started successfully at port ${port}`);
});