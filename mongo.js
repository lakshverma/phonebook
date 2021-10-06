/* eslint-disable no-console */
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://lakshverma:${password}@cluster0.foaqa.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({}, { _id: 0, __v: 0 }).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  // eslint-disable-next-line no-unused-vars
  person.save().then((_result) => {
    console.log(`Added ${person.name} number ${person.number} to contacts!`);
    mongoose.connection.close();
  });
} else {
  console.log(
    'Too many arguments. Correct format: node mongo.js <password> <name> <phonenumber>',
  );
  process.exit(1);
}
