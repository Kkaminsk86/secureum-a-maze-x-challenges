const { expect } = require('chai');
const { ethers } = require('hardhat');

// run the test
// npx hardhat test ./test/N2-Weirdo-easy.js
describe('CTF #2 Weirdo', function () {
  before(async function () {
    [deployer] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('N2Weirdo');
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') });
    await challengeInstance.deployed();
  });

  it('Should recover all funds', async function () {
    const Hack = await ethers.getContractFactory('N2WeirdoHack');
    const hackInstance = await Hack.deploy(challengeInstance.address, { value: ethers.utils.parseEther('0.0001') });
    await hackInstance.deployed();
    const tx = await challengeInstance.recoverFunds();
    await tx.wait();
    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0');
  });
});
