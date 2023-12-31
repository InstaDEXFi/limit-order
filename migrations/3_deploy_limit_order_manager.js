const LimitOrderManager = artifacts.require("LimitOrderManager");
const InstaDEX = artifacts.require("InstaDEX");
const WETHExtended = artifacts.require("WETHExtended");
const UniswapUtils = artifacts.require("UniswapUtils");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer, network, accounts) {
  const wrappedETHAddress = process.env.WETH;
  const uniswapFactory = process.env.UNISWAP_FACTORY;
  const feeAddress = process.env.FEE_ADDRESS;

  const InstaDEXInstance = await InstaDEX.deployed();

  await deployProxy(UniswapUtils, [], {deployer, unsafeAllow: ['constructor']});
  await deployer.deploy(WETHExtended);

  const managerUtilsInstance = await UniswapUtils.deployed();
  const WETHExtendedInstance = await WETHExtended.deployed();

  // 300k gas usage, 10% protocol fee
  await deployProxy(LimitOrderManager,
      [uniswapFactory, wrappedETHAddress, WETHExtendedInstance.address,
        managerUtilsInstance.address, InstaDEXInstance.address, [],
        feeAddress, 300000, 10000],
      {deployer, unsafeAllow: ['delegatecall', 'constructor']});
};
