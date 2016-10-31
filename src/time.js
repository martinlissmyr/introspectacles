var Time = function(unixTimeStamp) {
  var date = new Date(unixTimeStamp * 1000);
  this.hours = date.getHours();

  this.is = function(timeframe) {
    if (timeframe === "night") {
      return (this.hours < 6 || this.hours > 23) ? true : false;
    } else if (timeframe === "morning") {
      return (this.hours > 6 && this.hours < 11) ? true : false;
    } else if (timeframe === "lunch") {
      return (this.hours > 11 && this.hours < 16) ? true : false;
    } else if (timeframe === "evening") {
      return (this.hours > 16 && this.hours < 23) ? true : false;
    }
    return false;
  }
}

module.exports = function(unixTimeStamp) {
  return new Time(unixTimeStamp);
}
