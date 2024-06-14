var DevToken = artifacts.require("./DevToken.sol");

contract('DevToken', function (accounts) {
  var tokenInstance;
  console.log(accounts);

  it('initializes the contract with the correct values', function () {
    return DevToken.deployed().then(function (instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function (name) {
      console.log(name);
      assert.equal(name, 'DevToken', 'has the correct name');
      return tokenInstance.issueToken();
    }).then(function () {
      return tokenInstance.balanceOf(accounts[0])
    }).then(function (balance) {
      console.log("account0 balance");
      console.log(balance);
      return tokenInstance.transfer(accounts[1], 1000 * 10 ** 9)
    }).then(function () {
      return tokenInstance.balanceOf(accounts[1])
    }).then(function (balance) {
      console.log("account1 balance");
      console.log(balance);
      return tokenInstance.buyTokens({from: accounts[1]})
    }).then(function () {
      return tokenInstance.balanceOf(accounts[1])
    }).then(function (balance) {
      console.log("account1 balance after purchase");
      console.log(balance);
    });
  })
});
