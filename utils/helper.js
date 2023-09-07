const shortURLGenerator = () => {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var shortUrlLength = 6;
  var shortUrl = "";

  for (var i = 0; i <= shortUrlLength; i++) {
    var randomNum = Math.random() * chars.length;
    var randomChar = Math.floor(randomNum);
    shortUrl += chars.substring(randomChar, randomChar + 1);
  }

  return shortUrl;
};

const isValidUrl = (url) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(url);
};

exports.shortURLGenerator = shortURLGenerator;
exports.isValidUrl = isValidUrl;
