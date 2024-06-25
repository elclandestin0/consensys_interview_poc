//SPDX-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract NFTPlatform {
    // structs
    struct Bid {
        address tokenContract;
        uint256 askAmount;
        address from;
        address nftContract;
        uint256 tokenId;
    }

    // storage
    mapping (uint32 => Bid) public bids;

    // events
    event CreateBid(
        address tokenContract,
        uint256 askAmount,
        address nftContract,
        uint256 tokenId,
        address from
    );

    
    event AcceptBid(
        uint32 bidId,
        address from,
        uint256 initialPremiumFee,
        uint32 duration
    );

    event PayPrincipal(uint32 bidId, address tokenPaidIn, uint256 amountPaid);
    
    event DefaultLoan(
        uint32 bidId,
        address nftContract,
        uint256 tokenId
    );
}