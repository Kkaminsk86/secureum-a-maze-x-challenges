const { expect } = require('chai');
const { ethers } = require('hardhat');

// run the test
// npx hardhat test ./test/N5-BecomeMaster-medium.js
describe('CTF #5 BecomeMaster', function () {
  before(async function () {
    [deployer, user] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('N5BecomeMaster');
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') });
    await challengeInstance.deployed();
    // console.log(deployer.address);
  });

  it('Should recover all funds', async function () {
    const Hack = await ethers.getContractFactory('N5ExploitHack');
    const hackInstance = await Hack.deploy();
    await hackInstance.deployed();
    await challengeInstance.allocate({ value: ethers.utils.parseEther('0.0001') });
    await hackInstance.finalize(challengeInstance.address);
    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0');
  });
});
