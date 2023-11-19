const InstaDEX = artifacts.require("InstaDEX");

module.exports = async function(deployer) {
	await deployer.deploy(InstaDEX);
}
