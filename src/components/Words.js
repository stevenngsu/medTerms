const words = require("../main_dictionaries/psmedTerms_dictionary.json");

const random = () => {
    return Math.floor(Math.random() * words.length);
}

export let todaysObj = words[random()];

export const generateWordSet = async () => {
    let wordArr = [];
    for(let i=0; i < Object.keys(words).length; i++) {
        wordArr.push(words[i]['word'])
    }
    let wordSet = new Set(wordArr);
    let todaysWord = todaysObj["word"];
    return { wordSet, todaysWord };
};

export const guesses = 1;

