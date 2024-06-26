import { assert } from 'chai';
import { NFTPlatformInstance } from '../types/truffle-contracts/NFTPlatform';

const NFTPlatform = artifacts.require('NFTPlatform');

contract('NFTPlatform', ([deployer, borrower, lender]: string[]) => {
  let nftPlatform: NFTPlatformInstance;

  before(async () => {
    nftPlatform = await NFTPlatform.new("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
  });

  it('should create a bid with accepted token', async () => {
    const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const nftContract = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb38';
    const amount = web3.utils.toWei('1', 'ether');
    const tokenId = 1;

    await nftPlatform.createBid(tokenAddress, amount, nftContract, tokenId, { from: borrower });

    const bid = await nftPlatform.bids(1);

    // assert.equal(bid.tokenContract, tokenAddress, 'Token contract address mismatch');
    // assert.equal(bid.askAmount.toString(), amount, 'Ask amount mismatch');
    // assert.equal(bid.nftContract, nftContract, 'NFT contract address mismatch');
    // assert.equal(bid.tokenId.toString(), tokenId.toString(), 'Token ID mismatch');
    // assert.equal(bid.from, borrower, 'Bidder address mismatch');
  });

  it('should accept a bid and transfer the NFT to the contract', async () => {
    const bidId = 1;
    const duration = 60 * 60 * 24 * 30; // 30 days

    await nftPlatform.acceptBid(bidId, duration, { from: lender });

    const bid = await nftPlatform.bids(bidId);
    // assert.isTrue(bid.accepted, 'Bid was not accepted');
    // assert.isAbove(bid.dueDate.toNumber(), 0, 'Due date was not set');
  });

  // Uncomment this test once you implement the repayLoan function in the contract
  // it('should repay the loan and return the NFT to the borrower', async () => {
  //   const bidId = 1;
  //   const bid = await nftPlatform.bids(bidId);

  //   const amountToRepay = bid.askAmount.toString();

  //   await nftPlatform.repayLoan(bidId, { from: borrower, value: amountToRepay });

  //   const updatedBid = await nftPlatform.bids(bidId);
  //   assert.isFalse(updatedBid.accepted, 'Loan was not repaid');
  // });
});
