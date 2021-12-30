// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var MyCustomERC721Token = artifacts.require('./MyCustomERC721Token');

module.exports = function(deployer) {
  deployer.deploy(Verifier).then(() => {
    return deployer.deploy(MyCustomERC721Token).then(() => {
      return deployer.deploy(SolnSquareVerifier, Verifier.address);
    });
  });
};
