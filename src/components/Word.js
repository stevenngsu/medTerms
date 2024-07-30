const words = require("../main_dictionaries/prefix_suffix.json");

const generateWord = () => {
    let reroll = Math.floor(Math.random() * words.length);
    let wordObj = words[reroll];

    return wordObj;
};

export default generateWord;