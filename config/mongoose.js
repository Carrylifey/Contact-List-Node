//require libyray
const mongoose = require('mongoose');
//error
main().catch(err => console.log(err));


//connecting to db
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');
}

const db=mongoose.connection;
//error also
db.on('error', console.error.bind(console, 'connection error to db:'));

//for up and print
db.once('open', function() {
  // we're connected!
  console.log("we are connected to db");
});
