const Blockchain = require("./blockchain");
const Block = require("./block");
const cryptoHash = require("./crypto-hash");

describe("Blockchain", () => {

    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    });

    it("contains a `chain` Array instance", () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it("should start with a genesis block", () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("add a new block to the chain", () => {
        const newData = "foo-bar";
        blockchain.addBlock({
            data: newData
        });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe("isValidChain()", () => {
        describe("chain does not start with genesis block", () => {
            it('returns false', () => {
                blockchain.chain[0] = {
                    data: "fake-genesis"
                }

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe("when chain starts with genesis block and has multiple blocks", () => {

            beforeEach(() => {
                blockchain.addBlock({
                    data: "test"
                });
                blockchain.addBlock({
                    data: "test-1"
                });
                blockchain.addBlock({
                    data: "test-2"
                });
            });

            describe("and last hash reference has been changed", () => {
                it("returns false", () => {

                    blockchain.chain[2].lastHash = "broken-lastHash";

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe("and chain contains a block with the invalid field", () => {
                it("returns false", () => {

                    blockchain.chain[2].data = "some-evil-data";

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                });
            });
            describe("and chain does not contain any invalid blocks", () => {
                it("returns true", () => {

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);

                });
            });


            describe("and the chain contains a block with jumped difficulty", ()=>{
                it("returns false", ()=>{
                    const lastBlock = blockchain.chain[blockchain.chain.length-1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty-3;
                    const hash = cryptoHash(lastHash, timestamp, nonce, data, difficulty);
                    const badBlock = new Block({
                        timestamp, lastHash, hash, nonce, difficulty, data
                    });
                    blockchain.chain.push(badBlock);
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            });
        });


    });


    describe("replaceChain()", () => {

        let errorMock, logMock;

        // jest functions keep track of functions being called.
        beforeEach(()=>{
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe("when the new chain is not longer", () => {
            beforeEach(()=>{
                newChain.chain[0] = {
                    new: 'chain'
                };

                blockchain.replaceChain(newChain.chain);
            });

            it("does not replace the chain", () => {

                expect(blockchain.chain).toEqual(originalChain);

            });

            it("logs an error", ()=>{
                expect(errorMock).toHaveBeenCalled();
            });
        });
        describe("when the new chain is longer", () => {

            beforeEach(() => {
                newChain.addBlock({
                    data: "test"
                });
                newChain.addBlock({
                    data: "test-1"
                });
                newChain.addBlock({
                    data: "test-2"
                });
            });

            describe("and the chain is inavlid", () => {

                beforeEach(()=>{
                    newChain.chain[2].hash = "Fake-Hash";

                    blockchain.replaceChain(newChain.chain);
                });
                
                it("does not replace the chain", () => {


                    expect(blockchain.chain).toEqual(originalChain);

                });

            });
            describe("and the chain is valid", () => {
                beforeEach(()=>{
                    blockchain.replaceChain(newChain.chain);

                });

                it("replaces the chain", () => {
                    expect(blockchain.chain).toEqual(newChain.chain);

                });
                it("logs about the chain replacement", ()=>{
                    expect(logMock).toHaveBeenCalled();
                })
            });

        });



    });


});