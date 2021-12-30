var MyCustomERC721Token = artifacts.require('MyCustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await MyCustomERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(accounts[2], 2, 2);
            await this.contract.mint(accounts[3], 3, 3);
            await this.contract.mint(accounts[4], 4, 4);
            await this.contract.mint(accounts[5], 5, 5);
            await this.contract.mint(accounts[6], 6, 6);
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply.toString(), "5", "totalSupply should be 5");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(accounts[6]);
            assert.equal(balance, 1, "Accounts balance should be 1");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(6, {from: accounts[0]});
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/6", "TokenURI is wrong");
        })

        it('should transfer token from one owner to another', async function () { 
            let owner = await this.contract.ownerOf(2);
            assert.equal(owner, accounts[2], "Owner should be accounts[2]");
            await this.contract.transferFrom(accounts[2], accounts[3], 2, {from: accounts[2]});
            owner = await this.contract.ownerOf(2);
            assert.equal(owner, accounts[3], "Owner should be accounts[3]");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await MyCustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let threw = false;
            try {
                await this.contract.mint(accounts[8], 8, 8, {from: accounts[8]});
            } catch (err) {
                threw = true;
            }
            assert.equal(threw, true, "Minting should not work from non-owner");
        })

        it('should return contract owner', async function () { 
            assert.equal(await this.contract.getOwner(), accounts[0], "Owner should be accounts[0]");
        })

    });
})