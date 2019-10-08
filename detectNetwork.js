// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  var cardPrefix = num => Number(cardNumber.split("").splice(0,num).join(""));

  var first = cardPrefix(1);
  var firstTwo = cardPrefix(2);
  var firstThree = cardPrefix(3);
  var firstFour = cardPrefix(4);
  var firstSix = cardPrefix(6);
  var length = cardNumber.length;

  // Diner's club
  if (length === 14 && (firstTwo === 38 || firstTwo === 39)) {
    return "Diner's Club";
  }

  // American Express
  if (length === 15 && (firstTwo === 34 || firstTwo === 37)) {
    return "American Express";
  }

  // MasterCard
  if (length === 16) {
    let val;
    switch (firstTwo) {
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
        val = "MasterCard";
    }
    if(val) return val;
  }

  //Switch
  if ((firstSix === 564182 || firstSix === 633110) ||
      [4903, 4905, 4911, 4936, 6333, 6759].indexOf(firstFour) !== -1) {
    if ([16, 18, 19].indexOf(length) !== -1) {
      return "Switch";
    }
  }

  // Visa
  if (first === 4) {
    let val;
    switch (length) {
      case 13:
      case 16:
      case 19:
        val = "Visa";
    }
    if(val) return val;
  }

  //Discover
  if (firstFour === 6011 || firstTwo === 65 || (firstThree >= 644 && firstThree < 650)) {
    let val;
    switch (length) {
      case 16:
      case 19:
        val = "Discover";
    }
    if(val) return val;
  }

  // Maestro
  if (length >= 12 && length < 20) {
    let val;
    switch (firstFour) {
      case 5018:
      case 5020:
      case 5038:
      case 6304:
        val = "Maestro";
    }
    if(val) return val;
  }

  // China UnionPay
  if ((firstSix >= 622126 && firstSix < 622926) ||
      (firstFour >= 6282 && firstFour < 6289) ||
      (firstThree >= 624 && firstThree < 627)) {
    let val;
    switch (length) {
      case 16:
      case 17:
      case 18:
      case 19:
        val = "China UnionPay"
    }
    if(val) return val;
  }

  /*
  China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

  Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.
  */
  // Once you've read this, go ahead and try to implement this function, then return to the console.
};
