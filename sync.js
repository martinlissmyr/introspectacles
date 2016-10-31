var http = require("https");
var fs = require("fs");
var writeHeader = require("./src/write-header");
var config = require("./config.json");
var host = "api.foursquare.com";
var authParams = "?oauth_token=" + config.token + "&v=20161014";
var allCheckins = [];
var requests = 0;
var itemsPerRequest = 250;
var totalCheckins = 0;
var fetchedCheckins = 0;
var maxRequests = 100;

var writeFile = function(json, path, description, callback) {
  fs.writeFile(path, JSON.stringify(json, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(description + " saved to " + path);
      if (callback) {
        callback.call();
      }
    }
  });
}

var applyVenueCategoryOverrides = function() {
  allCheckins.map(function(checkin) {
    if (checkin.venue) {
      config.venueCategoryOverrides.map(function(override) {
        if (checkin.venue.id === override.venueId) {
          var newCategory = override.category;
          newCategory.primary = true;
          checkin.venue.categories = [newCategory];
        }
      });
    }
  });
}

var fetchCheckins = function() {
  http.request({
    host: host,
    path: "/v2/users/self/checkins" + authParams + "&limit=" + itemsPerRequest + "&offset=" + (requests * itemsPerRequest)
  }, function(response) {
    var str = "";
    var json;

    response.on("data", function(chunk) {
      str += chunk;
    });

    response.on("end", function() {
      json = JSON.parse(str);

      if (json.response.checkins.items.length > 0 && requests < maxRequests) {
        fetchedCheckins += json.response.checkins.items.length;
        console.log("- Got " + fetchedCheckins + " checkins... ");
        allCheckins = allCheckins.concat(json.response.checkins.items);
        requests++;
        fetchCheckins();
      } else {
        console.log("Done fetching checkin data")
        applyVenueCategoryOverrides();
        writeFile(allCheckins, "data/checkins.json", "Checkin History");
      }
    });
  }).end();
}

var fetchCategories = function(callback) {
  http.request({
    host: "api.foursquare.com",
    path: "/v2/venues/categories" + authParams
  }, function(response) {
    var str = "";

    response.on("data", function(chunk) {
      str += chunk;
    });

    response.on("end", function() {
      console.log("Done fetching categories")
      writeFile(JSON.parse(str).response.categories, "data/categories.json", "Category List", function() {
        callback.call();
      });
    });
  }).end();
}

writeHeader("Categories");
console.log("Starting fetching categories");
fetchCategories(function() {
  writeHeader("Checkin Data");
  console.log("Starting fetching checkin data");
  fetchCheckins();
});
