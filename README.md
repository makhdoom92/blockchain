# A Full Stack Blockchain Project

## Section 1:

Set up the overall blockchain application.

Created the basic building block of the blockchain - with blocks themselves!

Started a test-driven development approach to the project.

Built the genesis block - to get the blockchain going.

Added functionality to mine a block - create a new block for the blockchain.

Developed the important sha-256 hash function.

Applied the hash to mine a block.

## Section 2:

Created the fundamental blockchain class.

Developed functionality to validate the blockchain, to allow for chain replacement.

Implemented chain replacement.

Investigated stubbing console output in tests to keep the output clean.

## Section 3:

Implemented the proof of work system by adding a difficulty and nonce value to each block.

Adjusted the difficulty for a block to ensure that blocks are mined at a rate which approaches a set mining rate for the system.

Investigated the proof of work system by writing a script which checked how will the dynamic difficulty adjusted the system to approach the mine rate.

Switched the hexadecimal character-based difficulty criteria to a more fine-grained binary bit-based difficulty criteria.

Prevented a potential difficulty jump attack by adding extra validation for the blockchain.

