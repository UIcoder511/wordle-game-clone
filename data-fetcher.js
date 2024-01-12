const axios = require("axios");
const { writeFileSync } = require("fs");

const LIMIT_OF_WORDS = 50;

const SIZE_TO_PAGES = {
  4: 10,
  5: 26,
  6: 54,
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const URLofWordSize = (size, page) =>
  page === 1
    ? "https://www.bestwordlist.com/" + size + "letterwords.htm"
    : "https://www.bestwordlist.com/" +
      size +
      "letterwordspage" +
      page +
      ".htm";

// for (let i = 2; i <= 15; i++) {
//   urls.push("https://www.bestwordlist.com/5letterwordspage" + i + ".htm");
// }

// // Fetch the responses from all 15 pages, merge, and write to output file
// Promise.all(urls.map((url) => getWordsFromURL(url))).then((responses) => {
//   const words = new Set(responses.flat(1));
//   writeFileSync("./src/data/words.json", JSON.stringify(Array.from(words)));
// });

// Matches all 5 letter words in the URL response body
function getWordsFromURL(url) {
  return axios.get(url).then((response) => {
    return [...response.data.matchAll(/[A-Z]{5}/g)].map((match) =>
      match[0].toLowerCase()
    );
  });
}

function getArrayOfWordsFromResponse(length, response) {
  const regex = new RegExp("[A-Z]{" + length + "}", "g");
  const words = [...response.data.matchAll(regex)].map((match) =>
    match[0].toLowerCase()
  );
  return words;
}

async function getWordsOfLength(length) {
  //   const url = URLofWordSize(length);

  const arrOfPromises = [];
  for (let page = 1; page <= SIZE_TO_PAGES[length]; page++) {
    arrOfPromises.push(
      axios.get(URLofWordSize(length, page)).then((response) => {
        return getArrayOfWordsFromResponse(length, response);
      })
    );
  }

  return Promise.all(arrOfPromises).then((responses) => {
    return responses.flat(1);
  });
  //   const response = await axios.get(url);
  //   const words = [...response.data.matchAll(regex)].map((match) =>
  //     match[0].toLowerCase()
  //   );
  //   return [];
}

async function main() {
  const data = {};
  const dataPromises = [];
  for (const size of Object.keys(SIZE_TO_PAGES)) {
    let words = await getWordsOfLength(size);
    data[size] = shuffle(words).slice(0, LIMIT_OF_WORDS);
    dataPromises.push(data[size]);
  }

  writeFileSync("./src/data/words.json", JSON.stringify(data));
}

main();
