const { expect } = require('chai');
const { ethers } = require('hardhat');

// run the test
// npx hardhat test ./test/N3-TimeLock-easy.js
describe('CTF #3 TimeLock', function () {
  before(async function () {
    [user, alice] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('N3TimeLock');
    challengeInstance = await Challenge.deploy();
    await challengeInstance.deployed();

    await challengeInstance.connect(alice).deposit({ value: ethers.utils.parseEther('0.0001') });
    await challengeInstance.connect(user).deposit({ value: ethers.utils.parseEther('0.0001') });
  });

  it('Should recover all funds', async function () {
    const Hack = await ethers.getContractFactory('N3TimeLockHack');
    const hackInstance = await Hack.deploy();
    await hackInstance.deployed();

    await hackInstance.hack(user.address, challengeInstance.address);
    await challengeInstance.connect(user).withdraw();
    expect(await challengeInstance.balances(user.address)).to.equal('0');
  });
});
