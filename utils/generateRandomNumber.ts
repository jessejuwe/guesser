function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); // recursive function call
  } else {
    return rndNum;
  }
}

export default generateRandomBetween;
