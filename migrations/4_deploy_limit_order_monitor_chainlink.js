const LimitOrderManager = artifacts.require("LimitOrderManager");
const LimitOrderMonitor = artifacts.require("LimitOrderMonitorChainlink");
const InstaDEX = artifacts.require("InstaDEX");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer, network, accounts) {

  const uniswapFactory = process.env.UNISWAP_FACTORY;
  const fastGasFeed = process.env.FAST_GAS_FEED;

  const limitOrderManagerInstance = await LimitOrderManager.deployed();
  const InstaDEXInstance = await InstaDEX.deployed();

  //_maxBatchSize = 10, monitorSize=20, monitorInterval = 1 block,
  // monitorFee = 20 % (this needs to be in a global config); the same % should be applied in the estimation
  await deployProxy(LimitOrderMonitor,
      [limitOrderManagerInstance.address, uniswapFactory, InstaDEXInstance.address,
          accounts[0], 10, 300, fastGasFeed],
      {deployer, unsafeAllow: ['constructor']});

  const limitOrderMonitorInstance = await LimitOrderMonitor.deployed()
  await limitOrderManagerInstance.addMonitor(limitOrderMonitorInstance.address);
};
