import React, { useState,useContext } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";


import toast from "react-hot-toast";
import { Dropdown, Menu, Button } from "antd";
import { ContractContext } from "../../context/ContractContext"; // Assuming you have a context for the contract


const Header = () => {
  const [navList, setNavList] = useState(false);

  


  const contract = useContext(ContractContext); // Use context to get the contract
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Function to vote
  const putVote = async () => {
    if (contract) {
      try {
        const tx = await contract.putVote();
        await tx.wait();
        toast.success("Vote submitted successfully!");
        setErrorMessage(""); // Clear any previous error messages
      } catch (error) {
        handleError(error);
      }
    }
  };

  // Function to handle errors
  const handleError = (error) => {
    let message = "Transaction failed";

    if (error && error.reason) {
      message = error.reason; // Direct revert reason from ethers.js
    } else if (error && error.data && error.data.message) {
      message = error.data.message; // Revert message contained within error data
    } else if (error && error.message) {
      message = error.message; // Fallback to the general error message
    }
    toast.error(message); 
    console.error("Error:", message); // This logs the revert message to the console
  };

  // Function to claim funds as a contractor
  const claimFundContractor = async () => {
    if (contract) {
      try {
        const tx = await contract.claimFundContractor();
        await tx.wait();
        toast.success("Funds claimed successfully by contractor!");
        setErrorMessage(""); // Clear any previous error messages
      } catch (error) {
        handleError(error);
      }
    }
  };

  // Function to claim funds as a buyer
  const claimFundUser = async () => {
    if (contract) {
      try {
        const tx = await contract.claimFundUser();
        await tx.wait();
        toast.success("Funds claimed successfully by user!");
        setErrorMessage(""); // Clear any previous error messages
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleMenuClick = (e) => {
    console.log(e.key);
    toast.success("Claimed by " + e.key);
  };


  const menu = (
    <Menu>
      <Menu.Item key="Buyer" onClick={claimFundUser} >
        Buyer
      </Menu.Item>
      <Menu.Item key="Seller" onClick={claimFundContractor} >
        Seller
      </Menu.Item>
    </Menu>
  );



  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo3.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
            
          
          </div>
          <div className="button flex">
            {/* <h4>
              <span>2</span> My List
            </h4>
            <button className='btn1'>
              <i className='fa fa-sign-out'></i> Sign In
            </button> */}
            <Dropdown overlay={menu}>
              <button>CLAIM</button>
            </Dropdown>

            <button className="votebtn" onClick={putVote}>Vote</button>
            
       
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
