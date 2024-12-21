import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import Buy from "../buy/Buy"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Profile from "../profile/Profile"

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../contract/RealEstate.json";
import { ContractContext } from "../context/ContractContext"; 

const Pages = () => {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  const contractAddress = "0x572569FC5B29a1886ae9Cf8E2cADe2607DB707d9";

  // Initialize Ethers and load the contract
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create an instance of ethers provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get the signer (the connected account)
        const signer = await provider.getSigner();

        // Connect to the contract
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log(accounts[0]);
        setAccount(accounts[0]);

        const realEstateContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(realEstateContract);

        const price = await realEstateContract.flatPrice();
        console.log(price);

        console.log("Contract is ", realEstateContract);
      } else {
        alert("Ethereum wallet not detected");
      }
    };

    loadBlockchainData();
  }, []);

  // Use another useEffect to perform actions based on contract state
  useEffect(() => {
    if (contract) {
      console.log("Contract set in state:", contract);

      // Example: Fetch flat price after contract is set
      const fetchFlatPrice = async () => {
        const price = await contract.flatPrice();
        console.log("Flat price:", ethers.formatEther(price));
      };

      fetchFlatPrice();
    }
  }, [contract]);

  return (
    <>
     <ContractContext.Provider value={contract}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/buy' component={Buy} />
          <Route exact path='/services' component={Services} />
          
          <Route exact path='/profile' component={Profile} />
        </Switch>
        <Footer />
      </Router>
      </ContractContext.Provider>
    </>
  )
}

export default Pages
