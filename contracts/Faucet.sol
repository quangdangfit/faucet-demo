// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint256 private number = 12980;

    function getNumber() public view returns (uint256) {
        return number;
    }
}
