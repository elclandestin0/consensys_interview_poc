import { assert } from 'chai';
import { NFTPlatformInstance } from '../types/truffle-contracts/NFTPlatform';
import {CollateralTokenInstance, USDCTokenInstance} from '../types/truffle-contracts/'
const NFTPlatform = artifacts.require('NFTPlatform');
const CollateralToken = artifacts.require('CollateralToken');
const USDCToken = artifacts.require('USDCToken');

contract('NFTPlatform', (accounts) => {
  let nftPlatform: NFTPlatformInstance;
  let collateralToken: CollateralTokenInstance;
  let usdcToken: USDCTokenInstance;
  let borrower: string;
  let lender: string;
  let nftContractAddress: string;

  before(async () => {
    collateralToken = await CollateralToken.new(accounts[0]);
    usdcToken = await USDCToken.new(accounts[0]);
    nftPlatform = await NFTPlatform.new(usdcToken.address);
    nftContractAddress = collateralToken.address;

    lender = accounts[0];
    borrower = accounts[1];

    await collateralToken.mint(borrower);
    accounts = await web3.eth.getAccounts();
  });

  it('should create a bid with accepted token', async () => {
    const tokenAddress = usdcToken.address;
    // mint correct amount
    const amount = web3.utils.toWei('1', 'ether');
    const tokenId = 1;

    await nftPlatform.createBid(tokenAddress, amount, nftContractAddress, tokenId, { from: borrower });

    // const bid = await nftPlatform.bids(1);

    // assert.equal("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb8", tokenAddress, 'Token contract address mismatch');
    // assert.equal(bid.askAmount.toString(), amount, 'Ask amount mismatch');
    // assert.equal(bid.nftContract, nftContract, 'NFT contract address mismatch');
    // assert.equal(bid.tokenId.toString(), tokenId.toString(), 'Token ID mismatch');
    // assert.equal(bid.from, borrower, 'Bidder address mismatch');
  });

  it('should accept a bid and transfer the NFT to the contract', async () => {
    const bidId = 1;
    const duration = 60 * 60 * 24 * 30; // 30 days

    await nftPlatform.acceptBid(bidId, {from: lender});

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
