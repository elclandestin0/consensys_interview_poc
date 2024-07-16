//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "hardhat/console.sol";

contract NFTPlatform is IERC721Receiver {
    // Structs
    struct Bid {
        uint32 bidId;
        address tokenContract;
        uint256 askAmount;
        address from;
        address nftContract;
        uint256 tokenId;
        bool accepted;
        bool defaulted;
        bool repaid;
        address lender;
    }

    // Storage
    mapping(uint32 => Bid) public bids;
    mapping(address => mapping(uint32 => Bid)) public borrowerBids;
    mapping(address => mapping(uint32 => Bid)) public lenderAcceptedLoans;
    mapping(address => bool) public acceptedTokens;
    mapping(address => bool) public acceptedNFTs;

    // Bid ID
    uint32 public currentBidId;
    uint256 public interest = 1000;

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

    // Can implement this in RepayLoan(). You can still foster a incentivized
    // platform without it (what are the implkications if someone else repays
    // a stranger's loan?)
    modifier onlyBorrower (uint32 bidId) {
        require(bids[bidId].from == msg.sender, "Not the borrower of this loan!");
        _;
    }

    modifier onlyLender (uint32 bidId) {
        require(bids[bidId].lender == msg.sender, "");
        _;
    }
 
    // Functions
    function createBid(
        address _tokenAddress,
        uint256 _amount,
        address _nftContract,
        uint256 _tokenId
    ) public {
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Must own the token to send!"
        );
        nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        Bid memory newBid = Bid({
            bidId: ++currentBidId,
            tokenContract: _tokenAddress,
            askAmount: _amount,
            nftContract: _nftContract,
            tokenId: _tokenId,
            from: msg.sender,
            accepted: false,
            defaulted: false,
            repaid: false,
            lender: address(0x0)
        });
        bids[currentBidId] = newBid;
        borrowerBids[msg.sender][currentBidId] = newBid;
        emit BidCreated(
            _tokenAddress,
            _amount,
            _nftContract,
            _tokenId,
            msg.sender
        );
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

        IERC721 nft = IERC721(bid.nftContract);
        require(
            nft.ownerOf(bid.tokenId) == address(this),
            "NFT is not staked in the contract"
        );

        // update bid
        bid.accepted = true;
        bid.lender = msg.sender;

        address borrower = bid.from;
        borrowerBids[borrower][bidId].accepted = true;
        lenderAcceptedLoans[msg.sender][bidId].accepted = true;

        emit BidAccepted(bidId, msg.sender);
    }

    function repayLoan(uint32 bidId) public {
        Bid storage bid = bids[bidId];
        require(bid.accepted, "Can't repay loan if not accepted");
        // can remove below require if you want to incentivize users to pay for other people's loans
        require(
            bid.from == msg.sender,
            "Only the creator of the bid can repay the loan!"
        );
        IERC20 token = IERC20(bid.tokenContract);

        // can remove comment below and comment out `interest` variable for a more robust interest calc.
        // to-do: implement calculate Interest
        // uint256 customInterest = calculateInterest(bid.askAmount, bid.dueDate - block.timestamp)
        uint256 totalPaymentRequired = bid.askAmount + interest;

        require(
            token.balanceOf(msg.sender) >= totalPaymentRequired,
            "Sender doesn't have the required funds"
        );
        require(
            token.transferFrom(msg.sender, address(this), totalPaymentRequired),
            "Token couldn't be transferred!"
        );

        IERC721 nft = IERC721(bid.nftContract);
        nft.transferFrom(address(this), msg.sender, bid.tokenId);

        bid.repaid = true;
        borrowerBids[msg.sender][bidId].repaid = true;
        address lender = bid.lender;
        lenderAcceptedLoans[lender][bidId].repaid = true;
        
        emit LoanRepaid(bidId, bid.tokenContract, totalPaymentRequired);
    }

    function defaultLoan(uint32 bidId) public {
        Bid storage bid = bids[bidId];
        // add more requires depending on how deep you want your protocol tog o
        // for example, maybe the loan can only be defaulted if the duration has passed
        require(!bid.defaulted, "Loan is already defaulted");
        require(bid.lender == msg.sender, "Lender not the msg.sender!");

        IERC721 nft = IERC721(bid.nftContract);
        require(nft.ownerOf(bid.tokenId) == address(this), "NFT not staked!");
        nft.safeTransferFrom(address(this), msg.sender, bid.tokenId);

        bid.defaulted = true;
        borrowerBids[msg.sender][bidId].defaulted = true;

        address lender = bid.lender;
        lenderAcceptedLoans[lender][bidId].defaulted = true;
        emit LoanDefaulted(bid.bidId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
