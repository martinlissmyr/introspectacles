var getTopListByType = require("./src/top-list-by-type");
var writeHeader = require("./src/write-header");
var writeTopList = require("./src/write-toplist");
var data = require("./data/checkins.json");
var config = require("./config.json");

if (!data) {
  console.log("No data. Sync first!");
  return;
}

if (!config) {
  console.log("No config.");
  return;
}

console.log("Total checkins: " + data.length);

config.stats.map(function(list) {
  writeHeader(list.title);
  writeTopList(getTopListByType(data, list.type, list.count));
});
