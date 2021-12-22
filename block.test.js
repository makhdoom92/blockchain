const Block = require("./block");
const {
    GENESIS_DATA
} = require("./config");
const cryptoHash = require("./crypto-hash");


// Describe Function is a dummy of the test to be taken
describe("Block", () => {
    const timestamp = "test-timestamp";
    const hash = "test-hash";
    const lastHash = "test-lastHash";
    const data = ["test", "test"];

    // const block = new Block({
    //     timestamp:timestamp,
    //     hash:hash,
    //     lastHash:lastHash,
    //     data:data
    // });

    // you only need to specify once
    const block = new Block({
        timestamp,
        hash,
        lastHash,
        data
    });

    // it function tests the variables describe above with the block objects.
    it('has a timestamp, a hash, lasthash and data', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.data).toEqual(data);

    });


    // Testing Genesis Block
    describe("genesis()", () => {
        const genesisBlock = Block.genesis();
        it("Expects to be the instance of Block", () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });
        it("Has Genesis Data", () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });

    describe("mineblock()", () => {
        const lastBlock = Block.genesis();
        const data = "mined Data";
        const minedBlock = Block.mineblock({
            lastBlock,
            data
        });

        it("returns a block instance", () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it("sets `lastHash` to be equal to the `hash` of the last block", () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it("sets `data`", () => {
            expect(minedBlock.data).toEqual(data);
        });

        it("sets `timestamp`", () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it("creates a SHA-256 `hash` based on the input", () =>{
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
        })
    });

});