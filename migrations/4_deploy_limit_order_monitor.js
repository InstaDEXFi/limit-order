const LimitOrderManager = artifacts.require("LimitOrderManager");
const LimitOrderMonitor = artifacts.require("LimitOrderMonitor");
const InstaDEX = artifacts.require("InstaDEX");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer, network, accounts) {

  const uniswapFactory = process.env.UNISWAP_FACTORY;

  const limitOrderManagerInstance = await LimitOrderManager.deployed();
  const InstaDEXInstance = await InstaDEX.deployed();

  //_maxBatchSize = 20, monitorSize=100, monitorInterval = 1 block
  await deployProxy(LimitOrderMonitor,
      [limitOrderManagerInstance.address, uniswapFactory, InstaDEXInstance.address, accounts[0],
        20, 300],
      {deployer, unsafeAllow: ['constructor']});

  const limitOrderMonitorInstance = await LimitOrderMonitor.deployed()
  await limitOrderManagerInstance.addMonitor(limitOrderMonitorInstance.address);
};
