// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract DevToken is ERC20 {
    constructor() public ERC20("DevToken", "DVT") {}

    function issueToken() public {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}
