const mongoose = require("mongoose");
const Person = require("./model/Person");
require("dotenv").config();

const connectionToDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DataBase connected..."))
    .catch((error) => console.error(error));
};
connectionToDB();

//create NewPerson

const person = new Person({
  name: "Hatem",
  age: 22,
  favoriteFoods: ["Couscous"]
});
person
  .save()
  .then(() => {
    console.log("person created");
  })
  .catch((error) => {
    console.log(error);
  });
//CreateManyPersons
const arrayOfPersons = [
  {
    name: "yassin",
    age: 24,
    favoriteFoods: [ "Sandwich", "Chemi"],
  },
  {
    name: "Mohammed",
    age: 40,
    favoriteFoods: ["spaghetti",]
  },
  {
    name: "Yomen",
    age: 13,
    favoriteFoods: ["Chocolate", "Candy"]
  },
];

Person.create(arrayOfPersons)
  .then(() => console.log("personList created"))
  .catch((error) => {
    console.log(error);
  });

//findpersons 
Person.find()
  .then((result) => console.log("PersonsList : ", result))
  .catch((error) => console.log(error));

//find a person by name
Person.findOne({ name: "Yassine" })
  .then((result) => console.log("person with name yasine", result.favoriteFoods))
  .catch((error) => console.log(error));

//find a person by _id
Person.findById({ _id: "" })
  .then((result) => console.log("person with id : ", result))
  .catch((error) => console.log(error));

// find and change a person age
Person.findOneAndUpdate(
  { _id: "" },
  { $set: { age : 56 } }
)
  .then((result) => console.log("New person is ", result))
  .catch((error) => console.log(error));

// find and delate a person
Person.findByIdAndDelete({ _id: "" })
  .then((result) => console.log("remove", result))
  .catch((error) => console.log(error));

// Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: { $in: ["Couscous"] } })
  .limit(2)
  .select("-age")
  .sort({ name: "asc" })
  .exec()
  .then((result) => console.log(result, "docs"))
  .catch((error) => console.log(error));
