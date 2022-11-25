const checkData = (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, types } = req.body;

  let { image } = req.body;

  const errors = [];

  const validateString = (string, variableName) => {
    if (!string) errors.push(variableName);
  };

  const validateNumber = (number, variableName) => {
    if (!number || Math.sign(number) === -1) errors.push(variableName);
  };

  const validateArray = (array, variableName) => {
    if (array === undefined || !array.length) errors.push(variableName);
  };

  validateString(name, "name");
  validateNumber(height, "height");
  validateNumber(weight, "weight");
  validateNumber(hp, "hp");
  validateNumber(attack, "attack");
  validateNumber(defense, "defense");
  validateNumber(speed, "speed");
  validateArray(types, "types");

  if (!image) image = "https://cdn-icons-png.flaticon.com/512/189/189665.png";
  else console.log(image);

  if (errors.length) {
    for (let i = 0; i < errors.length; i++) {
      errors[i] = errors[i].replace("", " ");
    }
    res.status(400).send(`The following data is incorrect: ${errors}`);
  } else {
    next();
  }
};

module.exports = checkData;
