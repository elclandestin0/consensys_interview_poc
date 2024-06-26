import { assert } from 'chai';
import { NFTPlatformInstance } from '../types/truffle-contracts/NFTPlatform';

const NFTPlatform = artifacts.require('NFTPlatform');

contract('NFTPlatform', ([deployer, borrower, lender]: string[]) => {
  let nftPlatform: NFTPlatformInstance;

  before(async () => {
    nftPlatform = await NFTPlatform.new("0x1234567890123456789012345678901234567890");
  });
  it('should create a bid with accepted token', async () => {
    // await nftPlatform.setAcceptedToken('0x1234567890123456789012345678901234567890', true, { from: deployer });

    const tokenAddress = '0x1234567890123456789012345678901234567890';
    const nftContract = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
    const amount = web3.utils.toWei('1', 'ether');
    const tokenId = 1;

    await nftPlatform.createBid(tokenAddress, amount, nftContract, tokenId, { from: borrower });

    const bid = await nftPlatform.bids(1);

    assert.equal(bid[0], tokenAddress, 'Token contract address mismatch');
    assert.equal(bid[1].toString(), amount, 'Ask amount mismatch');
    assert.equal(bid[2], nftContract, 'NFT contract address mismatch');
    assert.equal(bid[3].toString(), tokenId.toString(), 'Token ID mismatch');
    assert.equal(bid[4], borrower, 'Bidder address mismatch');
  });

  it('should accept a bid and transfer the NFT to the contract', async () => {
    const bidId = 1;
    const duration = 60 * 60 * 24 * 30; // 30 days

    await nftPlatform.acceptBid(bidId, duration, { from: lender });

    const bid = await nftPlatform.bids(bidId);
    assert.isTrue(bid[5], 'Bid was not accepted');
    assert.isAbove(bid[6], 0, 'Due date was not set');
  });

  it('should repay the loan and return the NFT to the borrower', async () => {
    const bidId = 1;
    const bid = await nftPlatform.bids(bidId);

    const amountToRepay = bid[1].toString();

    await nftPlatform.repayLoan(bidId, { from: borrower, value: amountToRepay });

    const updatedBid = await nftPlatform.bids(bidId);
    assert.isFalse(updatedBid[5], 'Loan was not repaid');
  });
});
