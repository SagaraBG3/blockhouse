import React from "react"
import { featured } from "../../data/Data"

import { ethers } from "ethers";
import { ContractContext } from "../../context/ContractContext";
import { useEffect, useState, useContext } from "react";

const FeaturedCard = () => {

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

  const images = {
    totalFlats: "../images/hero/h2.png",
    flatPrice: "../images/hero/h7.png",
    projectName: "../images/hero/h1.png",
    endTime: "../images/hero/h8.png",
    totalBuyers: "../images/hero/h9.png",
    soldFlats: "../images/hero/h10.png",
    votingEndTime: "../images/hero/h8.png",
    totalVote: "../images/hero/h11.png",
    fundClamed: "../images/hero/h1.png",
  };

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
           // new Date(contractData.endTime * 1000).toLocaleString()
            totalFlats: Number(totalFlats),
            flatPrice: ethers.formatEther(flatPrice), // Convert Wei to ETH
            projectName,
            endTime: new Date( Number(endTime) * 1000).toLocaleString(),
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
      {/* <div className='content grid5 mtop'>
        {featured.map((items, index) => (
          <div className='box' key={index}>
            <img src={items.cover} alt='' />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div> */}
<div className='content '>

{Object.entries(contractData)
      .filter(([key]) => key !== "owner") // Filter out 'owner'
      .map(([key, value], index) => (
        <div className="box" key={index}>
           <img src={images[key]} alt={key}  /> 
          <h4 className="text1">{key}</h4>
          <label className="text2">{value.toString()}</label>
        </div>
      ))}
        </div>
    </>
  )
}

export default FeaturedCard
