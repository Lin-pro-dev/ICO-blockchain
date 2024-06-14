const DevToken = artifacts.require("DevToken");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(DevToken, 1000);
};
