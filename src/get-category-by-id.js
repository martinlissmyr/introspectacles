var categories = require("../data/categories.json");

var unique = function(arr) {
  // Make it unique
  arr.sort();
  for (var i = 1, l = arr.length; i < l; ) {
    if (arr[i-1] == arr[i]) {
      arr.splice(i, 1);
    } else {
      i++;
    }
  }
  return arr;
}

var getSubCategoryIds = function(category) {
  var ids = [];
  var iterate = function(c, l) {
    l.push(c.id);
    c.categories.map(function(sc) {
      iterate(sc, l);
    });
  }
  iterate(category, ids);
  return unique(ids);
}

module.exports = getCategoryById = function(id, root) {
  var c = root ? getCategoryById(root).categories : categories;
  for (var key in c) {
    if (c[key].id === id) {
      var category = c[key];
      category.subcategories = getSubCategoryIds(category);
      return category;
    }
  }
}
