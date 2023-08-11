export const getLang = (lang) => {
  if (lang == 0) {
    return "Russian";
  } else if (lang == 1) {
    return "Armenian";
  } else if (lang == 2) {
    return "Georgian";
  } else if (lang == 3) {
    return "Azerbaijani";
  } else if (lang == 4) {
    return "Kazak";
  } else if (lang == 5) {
    return "Kirgiz";
  } else return null;
};

export const getBonusType = (type) => {
  if (type == 0) {
    return "bonus-for-loyal-cards";
  } else if (type == 1) {
    return "bonus-for-all";
  } else return null;
};

export const getMode = (mode) => {
  if (mode == 0) {
    return "wax";
  } else if (mode == 1) {
    return "water";
  } else if (mode == 2) {
    return "talinwater";
  } else if (mode == 3) {
    return "smoking";
  } else if (mode == 4) {
    return "tapwater";
  } else if (mode == 5) {
    return "milk";
  } else if (mode == 6) {
    return "hoover";
  } else if (mode == 7) {
    return "foam";
  } else if (mode == 8) {
    return "enginefluid";
  } else if (mode == 9) {
    return "blackening";
  } else if (mode == 10) {
    return "air";
  } else if (mode == 11) {
    return "drycleaning";
  } else if (mode == 12) {
    return "osmosis";
  } else if (mode == 13) {
    return "hotwater";
  } else if (mode == 14) {
    return "payer";
  } else if (mode == 15) {
    return "distilledwater";
  } else if (mode == 16) {
    return "lowpressurewater";
  } else if (mode == 17) {
    return "doublefoam";
  } else if (mode == 18) {
    return "hotair";
  } else if (mode == 19) {
    return "wheelpump";
  } else return null;
};

export function splitNumberIntoDigits(number) {
  if (isNaN(number) || !isFinite(number)) {
    console.error("Invalid input. Please provide a valid number.");
    return [];
  }

  const digits = [];
  let num = Math.abs(number); // Ensure positive number

  // Extract digits and add them to the array
  while (num > 0) {
    digits.unshift(num % 10);
    num = Math.floor(num / 10);
  }

  return digits;
}

export const getColor = (color) => {
  let fitst = splitNumberIntoDigits(color)[0];
  let second = splitNumberIntoDigits(color)[1];
  let color1;
  let color2;
  if (fitst == 0) {
    color1 = "Red";
  } else if (fitst == 1) {
    color1 = "Green";
  } else if (fitst == 2) {
    color1 = "Blue";
  } else if (fitst == 3) {
    color1 = "Yellow";
  } else if (fitst == 4) {
    color1 = "Pink";
  } else if (fitst == 5) {
    color1 = "Cyan";
  } else if (fitst == 6) {
    color1 = "White";
  }

  if (second == 0) {
    color2 = "Red";
  } else if (second == 1) {
    color2 = "Green";
  } else if (second == 2) {
    color2 = "Blue";
  } else if (second == 3) {
    color2 = "Yellow";
  } else if (second == 4) {
    color2 = "Pink";
  } else if (second == 5) {
    color2 = "Cyan";
  } else if (second == 6) {
    color2 = "White";
  }

  return [color1, " ", "/", " ", color2];
};

export const getRollColor = (color) => {
  if (color == 0) {
    return "Red";
  } else if (color == 1) {
    return "Green";
  } else if (color == 2) {
    return "Blue";
  } else if (color == 3) {
    return "Yellow";
  } else if (color == 4) {
    return "Pink";
  } else if (color == 5) {
    return "Cyan";
  } else if (color == 6) {
    return "White";
  } else return null;

};

export const getRoll = (roll) => {
  if (roll == 0) {
    return "roll0";
  } else if (roll == 1) {
    return "roll1";
  } else if (roll == 2) {
    return "roll2";
  } else if (roll == 3) {
    return "roll3";
  } else if (roll == 4) {
    return "roll4";
  } else if (roll == 5) {
    return "roll5";
  } else if (roll == 6) {
    return "roll6";
  } else if (roll == 7) {
    return "roll7";
  } else if (roll == 8) {
    return "roll8";
  } else if (roll == 9) {
    return "roll9";
  } else if (roll == 10) {
    return "roll10";
  } else if (roll == 11) {
    return "roll11";
  } else return null;
};
