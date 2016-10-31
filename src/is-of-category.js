var categories = require("../data/categories.json");

var getPrimaryCategory = function(categories) {
  return categories.find(function(category) {
    return category.primary;
  });
}

module.exports = function(checkin, ids) {
  var primaryCategory = getPrimaryCategory(checkin.venue.categories);
  return ids.find(function(id) {
    return primaryCategory.id === id;
  });
}
