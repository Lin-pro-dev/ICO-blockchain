// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract DevToken is ERC20 {
    uint256 private _rate;

    constructor() public ERC20("DevToken", "DVT") {}

    function issueToken(uint256 rate) public {
        _rate = rate;
        _mint(msg.sender, 1000 * 10 ** 18);
    }

    function buyTokens() public payable {
        address payable owner = msg.sender;
        uint256 amountTokens = countTokens(msg.value);
        _mint(owner, amountTokens);
        owner.transfer(address(this).balance);
    }

    function countTokens(uint256 weiAmount) public returns (uint256) {
        require(weiAmount > 0, "error wei amount");
        return weiAmount.mul(_rate);
    }
}
