//native crypto library of nodejs
const crypto = require('crypto'); 
// spread operator turns an array into many arguments ... is spread operator
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash("sha256");
    hash.update(inputs.sort().join(" "));
    //hash.digest takes input as array and output a fixed length hexadecimal value 
    return hash.digest("hex");
};

module.exports = cryptoHash;