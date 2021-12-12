const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
  date: { type: Date, default: Date.now },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
