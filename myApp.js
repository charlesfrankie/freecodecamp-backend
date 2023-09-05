require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connection is ready...'))
.catch((err) => console.log(err));

let Person;
const Schema = mongoose.Schema;
const personSchema  = new Schema({
  name: {type: String, required: true},
  age:  Number,
  favoriteFoods: [String]
});
Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let johnDoe = new Person({
    name: "John Doe",
    age: 24,
    favoriteFoods: ["Cheese Burger", "Pizza"]
  });
  johnDoe.save(function(err, data) {
    if(err) return console.err(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 24, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 36, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 18, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if(err) return console.err(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, person) {
    if(err) return console.err(err);
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
