var colors = require("colors");
module.exports = function(list) {
  list.map(function(venue, i) {
    console.log((i + 1) + ". " + colors.bold(venue.name + ", " + venue.city) + " (" + venue.count + " times) " + colors.gray("[" + venue.category.name + "]"));
  });
}
