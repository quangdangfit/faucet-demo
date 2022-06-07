import React, {useEffect, useState} from 'react';
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from "./utils/load-contract";

function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  })

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider);

      debugger

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract: contract,
        });
      } else {
        console.log("Please login metamask");
      }
    }
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="balance-view is-size-2">
          Current Balance: <strong>10 ETH</strong>
        </div>
        <button className="button is-primary mr-2">Donate</button>
        <button className="button is-danger mr-2">Withdraw</button>
        <button className="button is-link"
                onClick={() => {
                  web3Api.provider.request({method: "eth_requestAccounts"})
                }}
        >Connect Wallet
        </button>
        <span>
          <p>
            <strong>Account Address: </strong>
            {
              account ? account : "Account denied"
            }
          </p>
        </span>
      </div>
    </div>
  );
}

export default App;
