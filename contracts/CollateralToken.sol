//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract CollateralToken is ERC721, Ownable {
    uint256 public currentTokenId;

    constructor(
        address initialOwner
    ) ERC721("ConsensysCollateralToken", "CSYS") Ownable(initialOwner) {}

    function mint(address to) public {
        uint256 tokenId = ++currentTokenId;
        _safeMint(to, tokenId);
    }
}
