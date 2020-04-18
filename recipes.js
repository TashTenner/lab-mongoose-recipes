const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const Recipe = new Schema({
  title: { type: String, required: true, unique: true },
  // Type String. It should be required and unique.
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  // Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
  ingredients: { type: Array },
  // Type Array.
  cuisine: { type: String, required: true },
  // Type String. Should be required.
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  // Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  // Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
  duration: { type: Number, min: 0 },
  // Type Number. Min value should be 0.
  creator: { type: String },
  // Type String
  created: { type: Date, default: Date.now }
  // Type Date. By default today.
});

const newRecipe = mongoose.model("recipe", Recipe);
module.exports = newRecipe;

newRecipe
  .create({
    title: "2",
    level: "Amateur Chef",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cuisine: "Asian",
    dishType: "Dish",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu"
  })
  .then(recipe => {
    return newRecipe.insertMany(data);
  })
  .then(listRecipes =>
    listRecipes.forEach(oneRecipe => {
      console.log(`${oneRecipe.title}`);
    })
  )
  .then(recipe => {
    console.log(`Rigatoni alla Genovese updated`);
    return newRecipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(recipe => {
    return newRecipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(recipe => {
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("error", err);
  });
