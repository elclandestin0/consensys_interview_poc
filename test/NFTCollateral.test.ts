import { ethers } from "hardhat";
import { expect } from "chai";
import { NFTPlatform, CollateralToken, CUSDC } from "../typechain-types";
import { Signer } from "ethers";

describe("NFTPlatform", function () {
  let nftPlatform: NFTPlatform;
  let collateralToken: CollateralToken;
  let cUSDC: CUSDC;
  let owner: Signer, addr1: Signer, addr2: Signer;
  const initialSupply = ethers.parseEther("1000");

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const cUSDCFactory = await ethers.getContractFactory("cUSDC");
    cUSDC = (await cUSDCFactory.deploy(initialSupply)) as CUSDC;
    await cUSDC.waitForDeployment();

    const CollateralTokenFactory = await ethers.getContractFactory(
      "CollateralToken"
    );
    collateralToken = (await CollateralTokenFactory.deploy(
      await owner.getAddress()
    )) as CollateralToken;
    await collateralToken.waitForDeployment();
    await collateralToken.mint(await addr1.getAddress());

    const NFTPlatformFactory = await ethers.getContractFactory("NFTPlatform");
    nftPlatform = (await NFTPlatformFactory.deploy(
      await cUSDC.getAddress()
    )) as NFTPlatform;
    await nftPlatform.waitForDeployment();
    await collateralToken
      .connect(addr1)
      .approve(await nftPlatform.getAddress(), await collateralToken.currentTokenId());
  });

  it("should create a bid", async function () {
    const amount = ethers.toBigInt("1000");
    const tokenId = await collateralToken.currentTokenId();
    await expect(
      nftPlatform
        .connect(addr1)
        .createBid(
          await cUSDC.getAddress(),
          amount,
          await collateralToken.getAddress(),
          tokenId
        )
    )
      .to.emit(nftPlatform, "BidCreated")
      .withArgs(
        await cUSDC.getAddress(),
        amount,
        await collateralToken.getAddress(),
        tokenId,
        await addr1.getAddress()
      );

    const bid = await nftPlatform.bids(await nftPlatform.nextBidId());
    expect(bid.tokenContract).to.equal(await cUSDC.getAddress());
    expect(bid.askAmount).to.equal(amount);
    expect(bid.nftContract).to.equal(await collateralToken.getAddress());
    expect(bid.tokenId).to.equal(await collateralToken.currentTokenId());
    expect(bid.from).to.equal(await addr1.getAddress());
    expect(bid.accepted).to.equal(false);
  });

  it("should accept a bid", async function () {
    // Transfer tokens to addr1 and approve the NFTPlatform contract
    await cUSDC.transfer(await addr1.getAddress(), ethers.parseEther("20"));
    await cUSDC
      .connect(addr1)
      .approve(await nftPlatform.getAddress(), ethers.parseEther("10"));

    await expect(nftPlatform.connect(addr1).acceptBid(1))
      .to.emit(nftPlatform, "BidAccepted")
      .withArgs(1, await addr1.getAddress());

    const bid = await nftPlatform.bids(1);
    expect(bid.accepted).to.equal(true);
  });
});
