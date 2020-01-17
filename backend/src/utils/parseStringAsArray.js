module.exports = function parseStringAsArray(arrayAsString) {
  if(arrayAsString.length)
    return arrayAsString.split(",").map(t => t.trim());
  return [];
}