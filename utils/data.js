const names = [
"Nathan",
"Kiran",
"Zekey",
"Amanda",
"Jess",
"Ross",
"Taylor",
"Rachel"
];

const comments = [
    "Hello",
    "it's me",
    "I've been",
    "wondering",
    "if after ",
    "all this time",
    "would you like",
    "to meet?"
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserName = () =>
  `${getRandomArrItem(names)}_${getRandomArrItem(names)}`;

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${comments[genRandomIndex(comments)]}`;

const getRandomThought = (words) => {
  let thought = "";
  for (let i = 0; i < words; i++) {
    thought += ` ${getRandomWord()}`;
  }
  return thought.trim();
};

// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomThought };