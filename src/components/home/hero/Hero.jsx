import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

import { ethers } from "ethers";
import { ContractContext } from "../../context/ContractContext";
import { useEffect, useState, useContext } from "react";

const Hero = () => {


  const contract = useContext(ContractContext); // Use context to get the contract
  const [contractData, setContractData] = useState({
    owner: "",
    totalFlats: 0,
    flatPrice: 0,
    projectName: "",
    endTime: 0,
    totalBuyers: 0,
    soldFlats: 0,
    votingEndTime: 0,
    totalVote: 0,
    fundClamed: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        try {
          const owner = await contract.owner();
          const totalFlats = await contract.totalFlats();
          const flatPrice = await contract.flatPrice();
          const projectName = await contract.projectName();
          const endTime = await contract.endTime();
          const totalBuyers = await contract.totalBuyers();
          const soldFlats = await contract.soldFlats();
          const votingEndTime = await contract.votingEndTime();
          const totalVote = await contract.totalVote();
          const fundClamed = await contract.fundClamed();

          setContractData({
            owner,
            totalFlats: Number(totalFlats),
            flatPrice: ethers.formatEther(flatPrice), // Convert Wei to ETH
            projectName,
            endTime: Number(endTime),
            totalBuyers: Number(totalBuyers),
            soldFlats: Number(soldFlats),
            votingEndTime: Number(votingEndTime),
            totalVote: Number(totalVote),
            fundClamed,
          });
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      }
    };

    fetchData();
  }, [contract]); // Dependency array includes contract to rerun when contract changes




  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title={contractData.projectName} subtitle='Find new & featured property located in your local city.' />

          <form className='flex'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' />
            </div>
            <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' />
            </div>
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
