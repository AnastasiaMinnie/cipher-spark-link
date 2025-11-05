import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying HelpCrypt contract...");
  console.log("Deployer address:", deployer);

  const deployedHelpCrypt = await deploy("HelpCrypt", {
    from: deployer,
    log: true,
  });

  console.log(`HelpCrypt contract deployed at: ${deployedHelpCrypt.address}`);
  
  // Verify deployment
  const contract = await hre.ethers.getContractAt("HelpCrypt", deployedHelpCrypt.address);
  const applicationCount = await contract.applicationCount();
  console.log(`Verification: Application count is ${applicationCount} (expected 0)`);
  
  if (applicationCount === 0n) {
    console.log("✅ Deployment verification successful!");
  } else {
    console.warn("⚠️ Unexpected application count after deployment");
  }
};
export default func;
func.id = "deploy_helpCrypt"; // id required to prevent reexecution
func.tags = ["HelpCrypt"];

