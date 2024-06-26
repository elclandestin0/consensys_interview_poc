//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDCToken is ERC20, Ownable {

    constructor(
        address initialOwner
    ) ERC20("ConsensysCollateralToken", "CSYS") Ownable(initialOwner) {}

    function mint(address to) public onlyOwner {
        _mint(to, 10000000000);
    }
}
