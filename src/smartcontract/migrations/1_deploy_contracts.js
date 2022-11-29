const BookStorageFactoryContract = artifacts.require("BookStorageFactoryContract")

module.exports = function(deployer) {
  deployer.deploy(BookStorageFactoryContract);
};
