// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "@openzeppelin/contracts/drafts/ERC20Permit.sol";

///	@title	InstaDEX token contract
contract InstaDEX is ERC20Permit {

    constructor() ERC20("InstaDEX", "IDEX") ERC20Permit("InstaDEX") {
        _mint(msg.sender, 100_000_000e18);
    }
}