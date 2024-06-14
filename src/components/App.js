import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import './App.css';
import DevToken from '../abis/DevToken.json'
import Navbar from './Navbar'
import AccountListItem from "./AccountListItem"

const App = () => {
  const [account, setAcount] = useState();
  const [accounts, setAcounts] = useState([]);
  const [devToken, setDevToken] = useState();
  const [amountToken, setAmountToken] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(0);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAcount(accounts[0])
    setAcounts(accounts);
    const networkId = await web3.eth.net.getId()
    const networkData = DevToken.networks[networkId]

    if (networkData) {
      const dToken = web3.eth.Contract(DevToken.abi, networkData.address)
      setDevToken(dToken)
    } else {
      window.alert('devToken contract not deployed to detected network.')
    }
  }

  const handleAction = () => {
    devToken.methods.buyTokens().send({ from: account }).then(receipt => {
      console.log("Transaction receipt:", receipt);
    })
      .catch(err => {
        console.error("Error:", err);
      });;
    // crowdSale.methods.purchaseToken(selectedAccount, account, amountToken);
    // .once('receipt', (receipt) => {
    //   console.log("here");
    //   myToken.methods.mint(selectedAccount, amountToken)
    // });
  }

  const handleInput = (e) => {
    setAmountToken(e.target.value)
  }

  const handleRadioChange = (account) => {
    setSelectedAccount(account);
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [])

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className='action-group'>
          <input className='token-input' type="number" onChange={handleInput}></input>
          <button onClick={handleAction}>Purchase</button>
        </div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>select</th>
              <th>id</th>
              <th>address</th>
              <th>balance</th>
              <th>token</th>
            </tr>
          </thead>
          <tbody>
            {
              accounts.map((item, index) => (
                <AccountListItem
                  key={index}
                  id={index + 1}
                  account={item}
                  token={devToken}
                  checked={item === selectedAccount}
                  handleRadioChange={handleRadioChange}
                >{index}</AccountListItem>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
