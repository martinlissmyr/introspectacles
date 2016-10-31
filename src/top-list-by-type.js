var isOfType = require("./is-of-type");

module.exports = function(data, type, length) {
  var entitiesCount = {};
  var entities = {};
  var mergedList = [];

  var matchesType = function(name) {
    return types.find(function(t) {
      var re = new RegExp("\\b" + t + "\\b", "i");
      //console.log(re);
      return name.search(re);
    });
  }

  data.map(function(checkin) {
    if (checkin.venue && checkin.venue.categories && checkin.venue.categories.length > 0) {
      if (isOfType(checkin, type)) {
        if (entitiesCount[checkin.venue.id]) {
          entitiesCount[checkin.venue.id]++;
        } else {
          entitiesCount[checkin.venue.id] = 1;
        }
        entities[checkin.venue.id] = checkin.venue;
      }
    }
  });

  for (var key in entitiesCount) {
    mergedList.push({
      id: key,
      name: entities[key].name,
      category: entities[key].categories[0],
      city: entities[key].location.city || "",
      count: entitiesCount[key]
    });
  }

  mergedList.sort(function(a, b) {
    return b.count - a.count;
  });

  return mergedList.slice(0, length);
}
