App = {
  web3Provider: null,
  contracts: {},
	

  initWeb3: function() {
    // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
	  App.web3Provider = web3.currentProvider;
	} else {
	  // If no injected web3 instance is detected, fall back to Ganache
	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
		$.getJSON('User.json', function(data) {
	  // Get the necessary contract artifact file and instantiate it with truffle-contract
	  var UserArtifact = data;
	  App.contracts.User = TruffleContract(UserArtifact);

	  // Set the provider for our contract
	  App.contracts.User.setProvider(App.web3Provider);

});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-pressed', App.handleSetUser);
	$(document).on('click', '.btn-CheckPressed', App.handleCheckUser);
	$(document).on('click', '.btn-UserPressed', App.handleCreateUser);
  },
  
  handleSetUser: function(event) {
    event.preventDefault();

    var accountAddress =  $('#setAccountAddress').val();

		var UserInstance;

	web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
		console.log(error);
	  }

	  var account = accounts[0];

	  App.contracts.User.deployed().then(function(instance) {
		UserInstance = instance;

		// Execute SetUser as a transaction by sending account
		return UserInstance.SetUser(accountAddress, {from: account});
	  }).then(function(result) {
		$('#SetUserStatus').val("true");
		alert("success");
	  }).catch(function(err) {
		console.log(err.message);
	  });
	});
	$('#SetUserStatus').val("true");
  },
  
  
  handleCheckUser: function(event) {
    event.preventDefault();

    var accountAddress =  $('#CheckAccountAddress').val();

		var UserInstance;

	web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
		console.log(error);
	  }

	  var account = accounts[0];

	  App.contracts.User.deployed().then(function(instance) {
		UserInstance = instance;

		// Execute adopt as a transaction by sending account
		return UserInstance.AccountAdded(accountAddress, {from: account});
	  }).then(function(result) {	
		alert(result);
	  }).catch(function(err) {
		console.log(err.message);
	  });
	});
  },
  handleCreateUser: function(event) {
    event.preventDefault();

    var UserAddress =  $('#UserAccountAddress').val();
	var UserName =  $('#UserName').val();
		var UserInstance;

	web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
		console.log(error);
	  }

	  var account = accounts[0];

	  App.contracts.User.deployed().then(function(instance) {
		UserInstance = instance;

		// Execute adopt as a transaction by sending account
		return UserInstance.CreateUser(UserAddress,UserName, {from: account});
	  }).then(function(result) {	
		alert(result);
	  }).catch(function(err) {
		console.log(err.message);
	  });
	});
  }


};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});
