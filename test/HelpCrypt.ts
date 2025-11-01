import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { HelpCrypt, HelpCrypt__factory } from "../types";
import { expect } from "chai";

type Signers = {
  deployer: HardhatEthersSigner;
  applicant: HardhatEthersSigner;
  verifier: HardhatEthersSigner;
  donor: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("HelpCrypt")) as HelpCrypt__factory;
  const helpCryptContract = (await factory.deploy()) as HelpCrypt;
  const helpCryptContractAddress = await helpCryptContract.getAddress();

  return { helpCryptContract, helpCryptContractAddress };
}

describe("HelpCrypt", function () {
  let signers: Signers;
  let helpCryptContract: HelpCrypt;
  let helpCryptContractAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { 
      deployer: ethSigners[0], 
      applicant: ethSigners[1], 
      verifier: ethSigners[2],
      donor: ethSigners[3]
    };
  });

  beforeEach(async function () {
    // Check whether the tests are running against an FHEVM mock environment
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ helpCryptContract, helpCryptContractAddress } = await deployFixture());
  });

  it("should have zero applications after deployment", async function () {
    const count = await helpCryptContract.applicationCount();
    expect(count).to.eq(0);
  });

  it("should submit an encrypted application", async function () {
    // Create encrypted inputs
    // Using uint64 for identity and reason hashes, uint32 for amount
    const identityHash = 12345678901234n; // Simulated hash value
    const reasonHash = 98765432109876n;   // Simulated hash value
    const amount = 5000;

    // Encrypt identity hash
    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash)
      .encrypt();

    // Encrypt reason hash
    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash)
      .encrypt();

    // Encrypt amount
    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(amount)
      .encrypt();

    // Submit application
    const tx = await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );
    await tx.wait();

    // Verify application was created
    const count = await helpCryptContract.applicationCount();
    expect(count).to.eq(1);

    // Get application info
    const [applicant, publicAmount, timestamp, status, donatedAmount] = 
      await helpCryptContract.getApplicationInfo(0);
    
    expect(applicant).to.eq(signers.applicant.address);
    expect(publicAmount).to.eq(amount);
    expect(status).to.eq(0); // Pending
    expect(donatedAmount).to.eq(0);
  });

  it("should verify an application", async function () {
    // First submit an application
    const identityHash = 11111111111111n;
    const reasonHash = 22222222222222n;
    const amount = 3000;

    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash)
      .encrypt();

    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash)
      .encrypt();

    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(amount)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );

    // Verify the application
    const tx = await helpCryptContract
      .connect(signers.verifier)
      .verifyApplication(0, true);
    await tx.wait();

    // Check status is now Verified
    const [, , , status, ] = await helpCryptContract.getApplicationInfo(0);
    expect(status).to.eq(1); // Verified

    // Check verifier address
    const verifier = await helpCryptContract.getVerifier(0);
    expect(verifier).to.eq(signers.verifier.address);
  });

  it("should reject an application", async function () {
    // Submit an application
    const identityHash = 33333333333333n;
    const reasonHash = 44444444444444n;
    const amount = 8000;

    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash)
      .encrypt();

    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash)
      .encrypt();

    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(amount)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );

    // Reject the application
    const tx = await helpCryptContract
      .connect(signers.verifier)
      .verifyApplication(0, false);
    await tx.wait();

    // Check status is now Rejected
    const [, , , status, ] = await helpCryptContract.getApplicationInfo(0);
    expect(status).to.eq(2); // Rejected
  });

  it("should not allow self-verification", async function () {
    // Submit an application
    const identityHash = 55555555555555n;
    const reasonHash = 66666666666666n;
    const amount = 1000;

    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash)
      .encrypt();

    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash)
      .encrypt();

    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(amount)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );

    // Try to verify own application (should fail)
    await expect(
      helpCryptContract.connect(signers.applicant).verifyApplication(0, true)
    ).to.be.revertedWith("Cannot verify own application");
  });

  it("should donate to a verified application", async function () {
    // Submit and verify an application first
    const identityHash = 77777777777777n;
    const reasonHash = 88888888888888n;
    const amount = 2000;

    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash)
      .encrypt();

    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash)
      .encrypt();

    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(amount)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );

    // Verify the application
    await helpCryptContract.connect(signers.verifier).verifyApplication(0, true);

    // Get applicant balance before donation
    const balanceBefore = await ethers.provider.getBalance(signers.applicant.address);

    // Donate
    const donationAmount = ethers.parseEther("1.0");
    const tx = await helpCryptContract
      .connect(signers.donor)
      .donate(0, { value: donationAmount });
    await tx.wait();

    // Check applicant received funds
    const balanceAfter = await ethers.provider.getBalance(signers.applicant.address);
    expect(balanceAfter - balanceBefore).to.eq(donationAmount);

    // Check donated amount in application
    const [, , , , donatedAmountInContract] = await helpCryptContract.getApplicationInfo(0);
    expect(donatedAmountInContract).to.eq(donationAmount);
  });

  it("should not donate to unverified application", async function () {
    // Submit an application but don't verify
    const identityHash = 99999999999999n;
    const reasonHash = 11111111111111n;
    const amount = 1000;

    const encryptedIdentityHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash)
      .encrypt();

    const encryptedReasonHash = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash)
      .encrypt();

    const encryptedAmount = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(amount)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash.handles[0],
        encryptedIdentityHash.inputProof,
        encryptedReasonHash.handles[0],
        encryptedReasonHash.inputProof,
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        amount
      );

    // Try to donate (should fail)
    await expect(
      helpCryptContract.connect(signers.donor).donate(0, { value: ethers.parseEther("0.1") })
    ).to.be.revertedWith("Application not verified");
  });

  it("should track applicant applications", async function () {
    // Submit two applications from the same applicant
    const identityHash1 = 12121212121212n;
    const reasonHash1 = 23232323232323n;
    
    const encryptedIdentityHash1 = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash1)
      .encrypt();

    const encryptedReasonHash1 = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash1)
      .encrypt();

    const encryptedAmount1 = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(1000)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash1.handles[0],
        encryptedIdentityHash1.inputProof,
        encryptedReasonHash1.handles[0],
        encryptedReasonHash1.inputProof,
        encryptedAmount1.handles[0],
        encryptedAmount1.inputProof,
        1000
      );

    const identityHash2 = 34343434343434n;
    const reasonHash2 = 45454545454545n;
    
    const encryptedIdentityHash2 = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(identityHash2)
      .encrypt();

    const encryptedReasonHash2 = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add64(reasonHash2)
      .encrypt();

    const encryptedAmount2 = await fhevm
      .createEncryptedInput(helpCryptContractAddress, signers.applicant.address)
      .add32(2000)
      .encrypt();

    await helpCryptContract
      .connect(signers.applicant)
      .submitApplication(
        encryptedIdentityHash2.handles[0],
        encryptedIdentityHash2.inputProof,
        encryptedReasonHash2.handles[0],
        encryptedReasonHash2.inputProof,
        encryptedAmount2.handles[0],
        encryptedAmount2.inputProof,
        2000
      );

    // Get applicant's applications
    const applications = await helpCryptContract.getApplicantApplications(signers.applicant.address);
    expect(applications.length).to.eq(2);
    expect(applications[0]).to.eq(0);
    expect(applications[1]).to.eq(1);
  });
});
