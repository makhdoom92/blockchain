const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash"); 
class Block{
    constructor({timestamp, lastHash, hash, data, nonce, difficulty}){ // passed arguments as objects so that the order of the arguments doesn't matter
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new Block(GENESIS_DATA);
    }
    static mineblock({lastBlock, data}){
        // const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        let hash, timestamp;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock : lastBlock, timestamp});
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        }while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));


        return new this({
            timestamp,
            lastHash,
            data,
            nonce,
            difficulty,
            hash
        });
    }

    static adjustDifficulty({ originalBlock, timestamp}){
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if(difference > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
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