pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is MyCustomERC721Token {

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 _index;
        address _addr;
    }

    // TODO define an array of the above struct
    Solution[] _solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) _solutionsSubmitted;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address addr);

    Verifier verifierContract;

    constructor(address verifierContractAddress) public {
        verifierContract = Verifier(verifierContractAddress);
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address addr, uint256 index, bytes32 hash) internal {
        _solutionsSubmitted[hash] = Solution({
            _index: index,
            _addr: addr
        });
        emit SolutionAdded(index, addr);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address to, uint256 tokenId,
        uint[2] memory a, uint[2] memory b_1, uint[2] memory b_2, uint[2] memory c, uint[2] memory input)
        public onlyOwner returns(bool) {
        bytes32 hash = keccak256(abi.encodePacked(a, b_1, b_2, c, input));
        require(_solutionsSubmitted[hash]._addr == address(0), "Solution must be unique");
        require(verifierContract.verifyTx(a, [b_1, b_2], c, input), "Solution must be valid");
        addSolution(to, tokenId, hash);

        return super.mint(to, tokenId, tokenId);
    }
}


  


























