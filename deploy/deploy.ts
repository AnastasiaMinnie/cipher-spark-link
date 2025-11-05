import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying FHECounter contract...");
  console.log("Deployer address:", deployer);

  const deployedFHECounter = await deploy("FHECounter", {
    from: deployer,
    log: true,
  });

  console.log(`FHECounter contract deployed at: ${deployedFHECounter.address}`);
  
  // Verify deployment
  const contract = await hre.ethers.getContractAt("FHECounter", deployedFHECounter.address);
  const count = await contract.getCount();
  console.log(`Verification: Initial count is ${count} (expected ${ethers.ZeroHash})`);
  
  if (count === ethers.ZeroHash) {
    console.log("✅ Deployment verification successful!");
  } else {
    console.warn("⚠️ Unexpected count after deployment");
  }
};
export default func;
func.id = "deploy_fheCounter"; // id required to prevent reexecution
func.tags = ["FHECounter"];
