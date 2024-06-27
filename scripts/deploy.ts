import { ethers } from "hardhat";

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  console.log("got signers");
  // Deploy CollateralToken
  const CollateralTokenFactory = await ethers.getContractFactory(
    "CollateralToken"
  );
  const collateralToken = await CollateralTokenFactory.deploy(
    await owner.getAddress()
  );
  await collateralToken.waitForDeployment();
  console.log(
    `CollateralToken deployed to: ${await collateralToken.getAddress()}`
  );
  const mintTx = await collateralToken.mint(await addr1.getAddress());
  await mintTx.wait();
  console.log("Minted 1 NFT to ", await addr1.getAddress());
  const numberOfTokens = await collateralToken.balanceOf(await addr1.getAddress()) 
  console.log(numberOfTokens);

  // Deploy cUSDC
  const cUSDCFactory = await ethers.getContractFactory("cUSDC");
  const initialSupply = ethers.toBigInt("1000000000000000");
  const cUSDC = await cUSDCFactory.deploy(initialSupply);
  await cUSDC.waitForDeployment();
  console.log(`cUSDC deployed to: ${await cUSDC.getAddress()}`);

  // Deploy NFTPlatform
  const NFTPlatformFactory = await ethers.getContractFactory("NFTPlatform");
  const nftPlatform = await NFTPlatformFactory.deploy(await cUSDC.getAddress());
  await nftPlatform.waitForDeployment();
  console.log(`NFTPlatform deployed to: ${await nftPlatform.getAddress()}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
