//SPDX-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract NFTPlatform {
    // Structs
    struct Bid {
        address tokenContract;
        uint256 askAmount;
        address from;
        address nftContract;
        uint256 tokenId;
    }

    // Storage
    mapping (uint32 => Bid) public bids;
    mapping (address => Bid[]) public acceptedBids;
    mapping (address => bool) public acceptedTokens;

    // Policy ID
    uint32 public nextBidId = 1;

    // Events
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

    constructor(address acceptedToken) {
        acceptedTokens[acceptedToken] = true;
    }

    // Modifiers 
    modifier onlyAcceptedTokens(address tokenAddress) {
        require(acceptedTokens[tokenAddress], "Not an accepted token address!");
        _;
    }

    // Functions
    function createBid(address _tokenAddress, uint256 _amount, address _nftContract, uint256 _tokenId) public onlyAcceptedTokens(_tokenAddress) {
        Bid memory newBid = Bid({
            tokenContract: _tokenAddress,
            askAmount: _amount,
            nftContract: _nftContract,
            tokenId: _tokenId,
            from: msg.sender
        });
        bids[nextBidId] = newBid;
         emit CreateBid(
            _tokenAddress,
            _amount,
            _nftContract,
            _tokenId,
            msg.sender
         );
         nextBidId++;
    }
}