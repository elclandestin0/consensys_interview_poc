//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";


contract NFTPlatform {
    // Structs
    struct Bid {
        uint32 bidId;
        address tokenContract;
        uint256 askAmount;
        address from;
        address nftContract;
        uint256 tokenId;
        bool accepted;
    }

    struct Loan {
        uint32 bidId;
        address tokenContract;
        uint256 askAmount;
        address from;
        address nftContract;
        uint256 tokenId;
        bool defaulted;
        address lender;
    }

    // Storage
    mapping(uint32 => Bid) public bids;
    mapping(address => Bid[]) public acceptedLoans;
    mapping(address => bool) public acceptedTokens;
    mapping(address => bool) public acceptedNFTs;
    mapping(uint32 => Loan) public loans;

    // Bid id
    uint32 public nextBidId = 1;

    // Events
    event BidCreated(
        address tokenContract,
        uint256 askAmount,
        address nftContract,
        uint256 tokenId,
        address from
    );

    event BidAccepted(uint32 bidId, address from);

    event LoanRepaid(uint32 bidId, address tokenPaidIn, uint256 amountPaid);

    event LoanDefaulted(uint32 bidId);

    constructor(address acceptedToken) {
        acceptedTokens[acceptedToken] = true;
    }

    // Modifiers
    modifier onlyAcceptedTokens(address tokenAddress) {
        require(acceptedTokens[tokenAddress], "Not an accepted token!");
        _;
    }

    // Modifiers
    modifier onlyAcceptedNFTs(address nftAddress) {
        require(acceptedNFTs[nftAddress], "Not an accepted NFT collection!");
        _;
    }

    // Functions
    function createBid(
        address _tokenAddress,
        uint256 _amount,
        address _nftContract,
        uint256 _tokenId
    ) public {
        console.log("here 0");
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Must own the token to send!"
        );
        nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        console.log("here");
        Bid memory newBid = Bid({
            bidId: nextBidId,
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

    function acceptBid(
        uint32 bidId
    ) public onlyAcceptedTokens(bids[bidId].tokenContract) {
        Bid storage bid = bids[bidId];
        require(!bid.accepted, "Bid already accepted");

        IERC20 token = IERC20(bid.tokenContract);
        require(
            token.transferFrom(msg.sender, bid.from, bid.askAmount),
            "Token transfer failed"
        );

        bid.accepted = true;
        // bid.dueDate = block.timestamp + duration;

        IERC721 nft = IERC721(bid.nftContract);
        require(
            nft.ownerOf(bid.tokenId) == address(this),
            "NFT is not staked in the contract"
        );

        emit BidAccepted(bidId, msg.sender);

        Loan memory loan = Loan({
            bidId: bid.bidId,
            tokenContract: bid.tokenContract,
            askAmount: bid.askAmount,
            from: bid.from,
            nftContract: bid.nftContract,
            tokenId: bid.tokenId,
            defaulted: false,
            lender: msg.sender
        });
    }

    function repayLoan(uint32 bidId) public {
        Bid storage bid = bids[bidId];
        require(bid.accepted, "Can't repay bid if not accepted");
        // can remove below require if you want to incentivize users to pay for other people's loans
        require(
            bid.from == msg.sender,
            "Only the creator of the bid can repay the loan!"
        );
        IERC20 token = IERC20(bid.tokenContract);

        // can remove comment below and comment out `interest` variable for a more robust interest calc.
        // uint256 customInterest = calculateInterest(bid.askAmount, bid.dueDate - block.timestamp)
        uint256 interest = 1000;
        uint256 totalPaymentRequired = bid.askAmount + interest;

        require(token.balanceOf(msg.sender) >= totalPaymentRequired);
        require(
            token.transferFrom(msg.sender, address(this), totalPaymentRequired)
        );

        IERC721 nft = IERC721(bid.nftContract);
        nft.transferFrom(address(this), msg.sender, bid.tokenId);

        emit LoanRepaid(bidId, bid.tokenContract, bid.askAmount);
        (bidId, bid.tokenContract, totalPaymentRequired);
    }

    function defaultLoan(uint32 bidId) public {
        Bid storage bid = bids[bidId];
        require(bid.accepted, "Bid must be accepted");
        // add more requires depending on how deep you want your protocol tog o

        IERC721 nft = IERC721(bid.nftContract);
        require(nft.ownerOf(bid.tokenId) == address(this), "NFT not staked!");
        nft.safeTransferFrom(address(this), msg.sender, bid.tokenId);

        emit LoanDefaulted(bid.bidId);
    }
}
