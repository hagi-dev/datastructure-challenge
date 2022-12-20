const fs = require("fs");

const input = require("./input.json");

const extracWeater = (input) => {
  const weathers = input.cities.map((element) => element.weather[0]);
  return {
    weathers,
    input,
  };
};

const cityByWeater = ({ weathers, input }) => {
  return weathers.map((weater) => {
    const cities = matchingCityByWeater(input, weater.id);
    return { weater, cities };
  });
};

const matchingCityByWeater = (input, weatherId) => {
  return input.cities.filter((item) => {
    if (item.weather && item.weather[0].id !== weatherId) return false;
    delete item.weather;
    return true;
  });
};

pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const output = pipe(extracWeater, cityByWeater)(input);

fs.writeFile("output.json", JSON.stringify(output), "utf8", (err) => {
  if (err) throw err;
  console.log("The file is save!");
});
