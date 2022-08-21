const xss = require('xss');
const options = {
    whiteList: {}, 
    stripIgnoreTag: true, 
    stripIgnoreTagBody: ["script"], 
}; // Regle perso pour filtrer
const myxss = new xss.FilterXSS(options);

module.exports = myxss;