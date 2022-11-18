const checkData = (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  const errors = [];

  console.log(hp);

  const addError = (variableName) => {
    errors.push(variableName);
  };

  const validateString = (string, variableName) => {
    if (!string) addError(variableName);
  };

  const validateNumber = (number, variableName) => {
    if (!number || Math.sign(number) === -1) addError(variableName);
  };

  const validateArray = (array, variableName) => {
    if (array === undefined || !array.length) addError(variableName);
  };

  validateString(name, "name");
  validateString(image, "image");
  validateNumber(height, "height");
  validateNumber(weight, "weight");
  validateNumber(hp, "hp");
  validateNumber(attack, "attack");
  validateNumber(defense, "defense");
  validateNumber(speed, "speed");
  validateArray(types, "types");

  if (errors.length) {
    for (let i = 0; i < errors.length; i++) {
      errors[i] = errors[i].replace("", " ");
    }
    console.log("ERROR");
    res.status(400).send(`The following data is incorrect: ${errors}`);
  } else {
    next();
  }
};

module.exports = checkData;
