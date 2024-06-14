var DevToken = artifacts.require("./DevToken.sol");

contract('DevToken', function (accounts) {
  var tokenInstance;
  console.log(accounts);

  it('initializes the contract with the correct values', function () {
    return DevToken.deployed().then(function (instance) {
      console.log("hererer");
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function (name) {
      console.log(name);
      assert.equal(name, 'DevToken', 'has the correct name');
      return tokenInstance.issueToken();
    }).then(function () {
      return tokenInstance.balanceOf(accounts[0])
    }).then(function (balance) {
      console.log("hhhhhhhhhhhhhhhhh");
      console.log(balance);
      return tokenInstance.balanceOf(accounts[1])
    }).then(function (balance) {

      console.log("hhhhhhhhhhhhhhhhh");
      console.log(balance);
    })
  })
});
