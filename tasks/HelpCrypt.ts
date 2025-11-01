import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

/**
 * Tutorial: Deploy and Interact Locally (--network localhost)
 * ===========================================================
 *
 * 1. From a separate terminal window:
 *
 *   npx hardhat node
 *
 * 2. Deploy the HelpCrypt contract
 *
 *   npx hardhat --network localhost deploy
 *
 * 3. Interact with the HelpCrypt contract
 *
 *   npx hardhat --network localhost task:helpcrypt-address
 *   npx hardhat --network localhost task:helpcrypt-count
 *
 *
 * Tutorial: Deploy and Interact on Sepolia (--network sepolia)
 * ===========================================================
 *
 * 1. Deploy the HelpCrypt contract
 *
 *   npx hardhat --network sepolia deploy
 *
 * 2. Interact with the HelpCrypt contract
 *
 *   npx hardhat --network sepolia task:helpcrypt-address
 *   npx hardhat --network sepolia task:helpcrypt-count
 *
 */

/**
 * Example:
 *   - npx hardhat --network localhost task:helpcrypt-address
 *   - npx hardhat --network sepolia task:helpcrypt-address
 */
task("task:helpcrypt-address", "Prints the HelpCrypt address").setAction(async function (_taskArguments: TaskArguments, hre) {
  const { deployments } = hre;

  const helpCrypt = await deployments.get("HelpCrypt");

  console.log("HelpCrypt address is " + helpCrypt.address);
});

/**
 * Example:
 *   - npx hardhat --network localhost task:helpcrypt-count
 *   - npx hardhat --network sepolia task:helpcrypt-count
 */
task("task:helpcrypt-count", "Gets the total application count")
  .addOptionalParam("address", "Optionally specify the HelpCrypt contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const HelpCryptDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("HelpCrypt");
    console.log(`HelpCrypt: ${HelpCryptDeployment.address}`);

    const helpCryptContract = await ethers.getContractAt("HelpCrypt", HelpCryptDeployment.address);

    const count = await helpCryptContract.applicationCount();
    console.log(`Total applications: ${count}`);
  });

/**
 * Example:
 *   - npx hardhat --network localhost task:helpcrypt-info --id 0
 *   - npx hardhat --network sepolia task:helpcrypt-info --id 0
 */
task("task:helpcrypt-info", "Gets application info by ID")
  .addOptionalParam("address", "Optionally specify the HelpCrypt contract address")
  .addParam("id", "The application ID")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const id = parseInt(taskArguments.id);
    if (!Number.isInteger(id) || id < 0) {
      throw new Error(`Argument --id must be a non-negative integer`);
    }

    const HelpCryptDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("HelpCrypt");
    console.log(`HelpCrypt: ${HelpCryptDeployment.address}`);

    const helpCryptContract = await ethers.getContractAt("HelpCrypt", HelpCryptDeployment.address);

    const [applicant, publicAmount, timestamp, status, donatedAmount] = await helpCryptContract.getApplicationInfo(id);
    
    const statusNames = ["Pending", "Verified", "Rejected", "Funded"];
    
    console.log(`Application #${id}:`);
    console.log(`  Applicant: ${applicant}`);
    console.log(`  Public Amount: ${publicAmount}`);
    console.log(`  Timestamp: ${new Date(Number(timestamp) * 1000).toISOString()}`);
    console.log(`  Status: ${statusNames[Number(status)]}`);
    console.log(`  Donated Amount: ${donatedAmount}`);
  });

