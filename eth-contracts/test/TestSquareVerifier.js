// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Verifier = artifacts.require('Verifier');

contract('Verifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await Verifier.new({from: account_one});
        })

        it('Test verification with correct proof', async function () {
            let proof = {
                "proof": {
                    "a": [
                        "0x09551c0d29b0e77caa2d1e41044bbe6e2b59aa0a5f9e15af39cc89a1d3aad8f3",
                        "0x18888faa6bc69f4f40c369b686b21f14398d3dca390dd6c23b8c50b98abe07c3"
                    ],
                    "b": [
                        [
                            "0x07eb2b10ea3af669cb5c2124ba5ec4bbb4d038da6d2d370fa036bdb32e9aa5ef",
                            "0x24f54dc9794295ec0ae12d7d538556d9f0fd17edd5d90ba5a9d360e2cbe46a44"
                        ],
                        [
                            "0x0cdaa2decc0e34857261a3e849f173669002071c2d627124ea42ce3e7bc1316a",
                            "0x0389a0b6ae6e25bbdedddabfbcda67b4bea4581c3d565ac40a0bfacf05428cfb"
                        ]
                    ],
                    "c": [
                        "0x1702ce19fc8372db99ed3232a9ae97ff343adf87bf376c3a4cbd51805fefca7d",
                        "0x25d601dad660e02a5cd69fc11978eb706537171c03b2823e64dcb0c2ebf7a156"
                    ]
                },
                "inputs": [
                    "0x0000000000000000000000000000000000000000000000000000000000000009",
                    "0x0000000000000000000000000000000000000000000000000000000000000001"
                ]
            };

            let proofResult = await this.contract.verifyTx.call(proof["proof"], proof["inputs"]);
            assert.equal(proofResult, true, "Proof should be true");
        });

        it('Test verification with incorrect proof', async function () {
            let proof = {
                "proof": {
                    "a": [
                        "0x09551c0d29b0e77caa2d1e41044bbe6e2b59aa0a5f9e15af39cc89a1d3aad8f3",
                        "0x18888faa6bc69f4f40c369b686b21f14398d3dca390dd6c23b8c50b98abe07c3"
                    ],
                    "b": [
                        [
                            "0x07eb2b10ea3af669cb5c2124ba5ec4bbb4d038da6d2d370fa036bdb32e9aa5ef",
                            "0x24f54dc9794295ec0ae12d7d538556d9f0fd17edd5d90ba5a9d360e2cbe46a44"
                        ],
                        [
                            "0x0cdaa2decc0e34857261a3e849f173669002071c2d627124ea42ce3e7bc1316a",
                            "0x0389a0b6ae6e25bbdedddabfbcda67b4bea4581c3d565ac40a0bfacf05428cfb"
                        ]
                    ],
                    "c": [
                        "0x1702ce19fc8372db99ed3232a9ae97ff343adf87bf376c3a4cbd51805fefca7d",
                        "0x25d601dad660e02a5cd69fc11978eb706537171c03b2823e64dcb0c2ebf7a156"
                    ]
                },
                "inputs": [
                    "0x0000000000000000000000000000000000000000000000000000000000000008",
                    "0x0000000000000000000000000000000000000000000000000000000000000001"
                ]
            };

            let proofResult = await this.contract.verifyTx.call(proof["proof"], proof["inputs"]);
            assert.equal(proofResult, false, "Proof should be false");
        });
    });
});
