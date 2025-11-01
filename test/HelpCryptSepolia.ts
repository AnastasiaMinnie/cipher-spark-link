import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { HelpCrypt } from "../types";
import { expect } from "chai";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("HelpCryptSepolia", function () {
  let signers: Signers;
  let helpCryptContract: HelpCrypt;
  let helpCryptContractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const HelpCryptDeployment = await deployments.get("HelpCrypt");
      helpCryptContractAddress = HelpCryptDeployment.address;
      helpCryptContract = await ethers.getContractAt("HelpCrypt", HelpCryptDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("submit and verify an application on Sepolia", async function () {
    steps = 12;

    this.timeout(4 * 60000); // 4 minutes timeout for Sepolia

    progress("Getting current application count...");
    const initialCount = await helpCryptContract.applicationCount();
    console.log(`Current application count: ${initialCount}`);

    progress("Creating encrypted identity hash...");
    const identityHash = BigInt(Date.now()) * 1000000n; // Unique hash based on timestamp
    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.alice.address)
      .add64(identityHash)
      .encrypt();

    progress("Creating encrypted reason hash...");
    const reasonHash = BigInt(Date.now()) * 2000000n; // Different hash
    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.alice.address)
      .add64(reasonHash)
      .encrypt();

    progress("Creating encrypted amount...");
    const amount = 1000;
    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.alice.address)
      .add32(amount)
      .encrypt();

    progress(`Submitting application to HelpCrypt=${helpCryptContractAddress}...`);
    let tx = await helpCryptContract
      .connect(signers.alice)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );
    
    progress(`Waiting for tx: ${tx.hash}...`);
    await tx.wait();

    progress("Verifying application was created...");
    const newCount = await helpCryptContract.applicationCount();
    expect(Number(newCount)).to.be.greaterThan(Number(initialCount));

    const applicationId = Number(newCount) - 1;
    progress(`Getting application info for ID ${applicationId}...`);
    const [applicant, publicAmount, timestamp, status, donatedAmount] = 
      await helpCryptContract.getApplicationInfo(applicationId);

    progress(`Application info retrieved:`);
    console.log(`  Applicant: ${applicant}`);
    console.log(`  Public Amount: ${publicAmount}`);
    console.log(`  Timestamp: ${new Date(Number(timestamp) * 1000).toISOString()}`);
    console.log(`  Status: ${status} (0=Pending, 1=Verified, 2=Rejected, 3=Funded)`);
    console.log(`  Donated Amount: ${donatedAmount}`);

    expect(applicant).to.eq(signers.alice.address);
    expect(publicAmount).to.eq(amount);
    expect(status).to.eq(0); // Pending

    progress("Application submission test completed successfully!");
  });

  it("get encrypted data handles on Sepolia", async function () {
    steps = 5;

    this.timeout(2 * 60000); // 2 minutes timeout

    progress("Getting current application count...");
    const count = await helpCryptContract.applicationCount();
    
    if (Number(count) === 0) {
      console.warn("No applications found. Skipping encrypted data test.");
      this.skip();
    }

    const applicationId = Number(count) - 1;
    progress(`Getting encrypted handles for application ${applicationId}...`);

    const encryptedIdentityHash = await helpCryptContract.getEncryptedIdentityHash(applicationId);
    progress(`Encrypted Identity Hash Handle: ${encryptedIdentityHash}`);
    expect(encryptedIdentityHash).to.not.eq(ethers.ZeroHash);

    const encryptedReasonHash = await helpCryptContract.getEncryptedReasonHash(applicationId);
    progress(`Encrypted Reason Hash Handle: ${encryptedReasonHash}`);
    expect(encryptedReasonHash).to.not.eq(ethers.ZeroHash);

    const encryptedAmount = await helpCryptContract.getEncryptedAmount(applicationId);
    progress(`Encrypted Amount Handle: ${encryptedAmount}`);
    expect(encryptedAmount).to.not.eq(ethers.ZeroHash);

    progress("Encrypted data handles retrieved successfully!");
  });
});
