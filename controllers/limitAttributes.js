module.exports = (data, attributeList) => {
    var obj = {};
    for (var i = 0; i < attributeList.length; i++) {
      if (typeof data[attributeList[i]] !== "undefined") {
        obj[attributeList[i]] = data[attributeList[i]];
      }
    }
    return obj;
  };
  