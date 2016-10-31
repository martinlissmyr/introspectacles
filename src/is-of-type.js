var categories = require("../data/categories.json");
var isOfCategory = require("./is-of-category");
var getCategoryById = require("./get-category-by-id");
var time = require("./time");

// Category lists
var cafeCategories = ["4bf58dd8d48988d16d941735", "4bf58dd8d48988d1e0931735"];
var barCategories = getCategoryById("4bf58dd8d48988d116941735", "4d4b7105d754a06376d81259").subcategories;
var restaurantCategories = getCategoryById("4d4b7105d754a06374d81259").subcategories;
var restaurantCategoriesWithoutCafes = restaurantCategories.filter(x => cafeCategories.indexOf(x) < 0);
var airportCategories = ["4bf58dd8d48988d1ed931735"];

var typeTests = {
  "cafe": function(checkin) {
    return isOfCategory(checkin, cafeCategories);
  },
  "bar": function(checkin) {
    return isOfCategory(checkin, barCategories);
  },
  "lunch-restaurant": function(checkin) {
    if (isOfCategory(checkin, restaurantCategoriesWithoutCafes)) {
      if (time(checkin.createdAt).is("lunch")) {
        return true;
      }
    }
    return false;
  },
  "dinner-restaurant": function(checkin) {
    if (isOfCategory(checkin, restaurantCategoriesWithoutCafes)) {
      if (time(checkin.createdAt).is("evening")) {
        return true;
      }
    }
    return false;
  },
  "breakfast-spot": function(checkin) {
    if (isOfCategory(checkin, restaurantCategories)) {
      if (time(checkin.createdAt).is("morning")) {
        return true;
      }
    }
    return false;
  },
  "airport": function(checkin) {
    return isOfCategory(checkin, airportCategories);
  }
}

module.exports = function(checkin, type) {
  if (!typeTests[type]) {
    console.log("No such type: " + type);
    return false;
  }

  return typeTests[type](checkin);
}
