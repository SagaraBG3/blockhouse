
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import "./profile.css"
import React, { useState, useContext ,useEffect} from "react";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { ContractContext } from "../context/ContractContext"; // Assuming you have a context for the contract


const Profile = () => {
  const contract = useContext(ContractContext); // Use context to get the contract
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [buyerDetails, setBuyerDetails] = useState(null);
  // Fetch buyer details
  const fetchBuyerDetails = async () => {
    if (contract) {
      try {
        const details = await contract.getBuyerDetails();
        setBuyerDetails(details); // Assuming details is an object with necessary properties
        console.log("Buyer details:", details);
      } catch (error) {
        console.error("Error fetching buyer details:", error);
      }
    }
  };

  useEffect(() => {
    fetchBuyerDetails();
  }, [contract]); // Run only when `contract` is available

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

  const depositFund = async (e) => {
    e.preventDefault();
    if (contract && inputValue) {
      try {
        const tx = await contract.depositFund({
          value: ethers.parseEther(inputValue),
        });
        await tx.wait();
        toast.success("Funds deposited successfully!");
        setErrorMessage(""); // Clear any previous error messages
        setInputValue(""); // Clear the input field
      } catch (error) {
        handleError(error);
      }
    } else {
      setErrorMessage("Contract is not loaded or invalid input");
    }
  };



  return (
    <>
      <section className='contact mb'>
        <Back name='Profile' title='Make sure to deposit remaining amount' cover={img} />
        <div className='container'>
 <div className="details">
        {buyerDetails && (
            <div>
             
              <p className="gap">Buyer Address: <span> {buyerDetails.buyerAddress}</span></p>
              <p>
                Total Amount Paid:{" "}
                <span>{ethers.formatEther(buyerDetails.totalAmountPaid)} ETH</span>
              </p>
              <p>
                Amount Remaining:{" "}
                <span>{ethers.formatEther(buyerDetails.amountRemaining)} ETH</span>
              </p>
              <p>Flat ID: <span>{Number(buyerDetails.flatID)}</span></p>
              <p>Fund Claimed:<span> {buyerDetails.fundClamed ? "Yes" : "No"}</span></p> 
            </div>
          )}

<form className="form" onSubmit={depositFund}>

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
        </div>
      </section>
    </>
  )
}

export default Profile;
