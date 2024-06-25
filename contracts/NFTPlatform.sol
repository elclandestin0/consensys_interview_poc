//SPDX-Identifier: MIT
pragma solidity ^0.8.2;

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

    event PayPrincipal(uint32 policyId);
    
    event DefaultLoan(
        uint32 indexed policyId,
        address indexed claimant,
        uint256 amount,
        bool isPremium
    );
}
