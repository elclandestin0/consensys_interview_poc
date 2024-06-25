import { assert } from 'chai';
import { NFTPlatformInstance } from '../types/truffle-contracts';

const NFTPlatform = artifacts.require('NFTPlatform');

contract('NFTPlatform', ([deployer, bidder]: string[]) => {
  let nftPlatform: NFTPlatformInstance;

  before(async () => {
    nftPlatform = await NFTPlatform.new("0x1234567890123456789012345678901234567890");
  });

  it('should create a bid with accepted token', async () => {
    // Add an accepted token address

    // Create a bid
    const tokenAddress = '0x1234567890123456789012345678901234567890';
    const nftContract = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
    const amount = web3.utils.toWei('1', 'ether');
    const tokenId = 1;

    await nftPlatform.createBid(tokenAddress, amount, nftContract, tokenId, { from: bidder });

    const bid = await nftPlatform.bids(1);

    assert.equal(bid.tokenContract, tokenAddress, 'Token contract address mismatch');
    assert.equal(bid.askAmount.toString(), amount, 'Ask amount mismatch');
    assert.equal(bid.nftContract, nftContract, 'NFT contract address mismatch');
    assert.equal(bid.tokenId.toString(), tokenId.toString(), 'Token ID mismatch');
    assert.equal(bid.from, bidder, 'Bidder address mismatch');
  });

  it('should revert when creating a bid with non-accepted token', async () => {
    const tokenAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
    const nftContract = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
    const amount = web3.utils.toWei('1', 'ether');
    const tokenId = 2;

    try {
      await nftPlatform.createBid(tokenAddress, amount, nftContract, tokenId, { from: bidder });
      assert.fail('Expected revert not received');
    } catch (error:) {
      const revertFound = error.message.search('Not an accepted token address!') >= 0;
      assert(revertFound, `Expected "Not an accepted token address!" but got ${error.message} instead`);
    }
  });
});
