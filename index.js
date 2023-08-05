//requireing the libeeries
const express = require('express')
const path = require('path');
const port=8000;

const db = require('./config/mongoose')
const Contact=require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware 1 
// app.use(function( req,res,next){
//     req.myName="Subhankar"
//    // console.log('middleware 1 called');
//     next();
// });

// //middleware 2 
// app.use(function(req,res,next){
//     console.log('My name from mw2', req.myName);
//     //console.log('middleware 2 called');
//     next();
// })

var contactList = [
    {
        name : "Darwin",
        phone: "1231511"
    },
    {
        name : "Subhanakr",
        phone: "1231515691"
    },
    {
        name : "Dbhaba",
        phone: "45864569"
    }

]


app.get('/',function(req,res){
   // console.log('from the get route controller',req.myName);
   const displayContact = async (req,res)=>{
    try{
         const contacts = await Contact.find({})   
         return res.render('home', {
         title : "MY Contact List" , 
        contact_List: contacts,
 });
} catch(error){
    console.log("error in fetching contacts from Database");
    return;
}
};
displayContact(req,res);
});


app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Lets us Play with EJs "
    })
})

app.post('/create_contact',function(req,res){
   // return res.redirect('practice');
   // console.log(req.body);
    //console.log(req.body.name);
   // contactList.push(req.body);
   const createContact = async (req, res) => {
    try {
      const newContact = await Contact.create(req.body);
      console.log("*****", newContact);
      res.redirect("back");
    } catch (error) {
      console.error(error);
    }
  };
  createContact(req,res);
    


});

//for deleting a contact
app.get('/delete-contact',function(req,res){
   // console.log(req.query);
   //get the id from query in the url
    let id = req.query.id;
    //find the contact  in the database using id and delete
    const deleteContact=async(req,res)=>{
        try{
            const delContact=await Contact.findByIdAndDelete(id);
            return res.redirect('back');
        } catch(err){
            console.log("error in deleting an object from database");
            return;
        }
    };
    deleteContact(req,res);

});


app.listen(port,function(err){
    if(err){
        console.log("Error in running the Server", err);
    }
    console.log('My Express server running on Port',port);
})