import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("LocationFactory", {
    from: deployer,
    // Contract constructor arguments
    //args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await deploy("Location", {
    from: deployer,
    // Contract constructor arguments
    args: [
      "TestLocation",
      39784133,
      -104973355,
      20,
      1677798762,
      1997898762,
      "data:application/json;base64,eyJuYW1lIjogIlFSLU5GVC1QUk9UT1RZUEUiLCJkZXNjcmlwdGlvbiI6ICJRUiBORlQgYXNzb2NpYXRlZCB3aXRoIGEgcmVhbCB3b3JsZCBsb2NhdGlvbiIsImltYWdlIjogImh0dHBzOi8vaXBmcy5pby9pcGZzL1FtVGdxbmhGQk1rZlQ5czhQSEtjZFhCbjFmNWJHM1E1aG1CYVI0VTZob1R2YjE/ZmlsZW5hbWU9Q2hhaW5saW5rX0VsZi5wbmciLCJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJkaXN0YW5jZSIsInZhbHVlIjogdGVzdCB2YWx1ZX1dfQ==",
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
