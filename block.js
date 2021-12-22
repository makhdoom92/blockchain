const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash"); 
class Block{
    constructor({timestamp, lastHash, hash, data}){ // passed arguments as objects so that the order of the arguments doesn't matter
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
    static genesis(){
        return new Block(GENESIS_DATA);
    }
    static mineblock({lastBlock, data}){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp, lastHash, data)
        });
    }

}

// const block1 = new Block(
//     {
//         timestamp: "test-timestamp", 
//         lastHash: "test-lastHash", 
//         hash : "test-hash", 
//         data: "data"
//     });

module.exports = Block;