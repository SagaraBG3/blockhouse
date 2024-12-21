import React, { useState, useContext } from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/buy.jpg";
import "./buy.css";

import toast from "react-hot-toast";
import { ethers } from "ethers";
import { ContractContext } from "../context/ContractContext";

const Buy = () => {
  const contract = useContext(ContractContext); // Use context to get the contract
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleError = (error) => {
    let message = "Transaction failed";

    if (error && error.reason) {
      message = error.reason; // Direct revert reason from ethers.js
    } else if (error && error.data && error.data.message) {
      message = error.data.message; // Revert message contained within error data
    } else if (error && error.message) {
      message = error.message; // Fallback to the general error message
    }
    setErrorMessage(message);
    toast.error(message); // Show toast notification for the error
    console.error("Error:", message); // This logs the revert message to the console
  };

  const buyFlat = async (e) => {
    e.preventDefault();
    if (contract && inputValue) {
      try {
        const tx = await contract.buyFlat({
          value: ethers.parseEther(inputValue),
        });
        await tx.wait();
        toast.success("Flat bought successfully!");
        setErrorMessage(""); // Clear any previous error messages
        setInputValue(""); // Clear the input field after successful purchase
      } catch (error) {
        handleError(error);
      }
    } else {
      setErrorMessage("Contract is not loaded or invalid input");
    }
  };

  return (
    <>
      <section className="about">
        <Back name="Wanna House" title="Just Buy it now!!" cover={img} />
        <div className="container flex mtop">
          <div className="left row">
            <Heading
              title="Make sure to deposit correctly"
              subtitle="Check out the correct price in ETH"
            />

            <p>
              Users can purchase flats directly through a secure Ethereum
              transaction. After buying, they can participate in voting on the
              project. If the majority votes to reject the contractor, they are
              eligible to claim a refund, ensuring transparency and safeguarding
              their investment.
            </p>
            {/* <button className='btn2'>More About Us</button> */}
            <form className="form" onSubmit={buyFlat}>
              <input
                type="text"
                className="form__field"
                placeholder="Enter the flat price"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update inputValue state on change
              />
              <button
                type="submit"
                className="btn btn--primary btn--inside uppercase"
              >
                Buy Flat
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="right row">
            <img src="./buy2.jpg" alt="" />
          </div>

          {/* <div className="container">
        <div className="container__item">
          <form className="form" onSubmit={buyFlat}>
            <input
              type="text"
              className="form__field"
              placeholder="Enter the flat price"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update inputValue state on change
            />
            <button
              type="submit"
              className="btn btn--primary btn--inside uppercase"
            >
              Buy Flat
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div> */}
        </div>
      </section>
    </>
  );
};

export default Buy;
