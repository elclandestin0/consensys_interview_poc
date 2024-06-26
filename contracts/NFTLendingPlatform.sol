//SPDX-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract NFTPlatform {
    // Structs
    struct Bid {
        address tokenContract;
        uint256 askAmount;
        address from;
        address nftContract;
        uint256 tokenId;
        bool accepted;
    }

    // Storage
    mapping(uint32 => Bid) public bids;
    mapping(address => Bid[]) public acceptedBids;
    mapping(address => bool) public acceptedTokens;
    mapping(address => bool) public acceptedNFTs;

    // Policy ID
    uint32 public nextBidId = 1;

    // Events
    event BidCreated(
        address tokenContract,
        uint256 askAmount,
        address nftContract,
        uint256 tokenId,
        address from
    );

    event BidAccepted(
        uint32 bidId,
        address from,
        uint256 initialPremiumFee,
        uint32 duration
    );

    event PrincipalPaid(uint32 bidId, address tokenPaidIn, uint256 amountPaid);

    event LoanDefaulted(uint32 bidId, address nftContract, uint256 tokenId);

    constructor(address acceptedToken) {
        acceptedTokens[acceptedToken] = true;
    }

    // Modifiers
    modifier onlyAcceptedTokens(address tokenAddress) {
        require(acceptedTokens[tokenAddress], "Not an accepted token address!");
        _;
    }

    // Modifiers
    modifier onlyAcceptedNFTs(address nftAddress) {
        require(acceptedNFTs[nftAddress], "Not an accepted token address!");
        _;
    }

    // Functions
    function createBid(
        address _tokenAddress,
        uint256 _amount,
        address _nftContract,
        uint256 _tokenId
    ) public {
        Bid memory newBid = Bid({
            tokenContract: _tokenAddress,
            askAmount: _amount,
            nftContract: _nftContract,
            tokenId: _tokenId,
            from: msg.sender,
            accepted: false
        });
        bids[nextBidId] = newBid;
        emit BidCreated(
            _tokenAddress,
            _amount,
            _nftContract,
            _tokenId,
            msg.sender
        );
        nextBidId++;
    }

    function acceptBid(uint32 bidId, uint256 duration) public onlyAcceptedTokens(bids[bidId].tokenContract) {
        Bid storage bid = bids[bidId];
        require(!bid.accepted, "Bid already accepted");

        IERC20 token = IERC20(bid.tokenContract);
        require(token.transferFrom(msg.sender, bid.from, bid.askAmount), "Token transfer failed");

        bid.accepted = true;
        // bid.dueDate = block.timestamp + duration;

        IERC721 nft = IERC721(bid.nftContract);
        require(nft.ownerOf(bid.tokenId) == address(this), "NFT is not staked in the contract");

        // emit BidAccepted(bidId, msg.sender, bid.dueDate);
    }

}
