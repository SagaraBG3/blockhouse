import React, { useEffect, useState, useContext } from "react";
import Heading from "../../common/Heading";
import "./awards.css";
import { ContractContext } from "../../context/ContractContext";

const Awards = () => {
  // State for endTime countdown
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // State for votingEndTime countdown
  const [votingDays, setVotingDays] = useState(0);
  const [votingHours, setVotingHours] = useState(0);
  const [votingMinutes, setVotingMinutes] = useState(0);
  const [votingSeconds, setVotingSeconds] = useState(0);

  const [endTime, setEndTime] = useState(0);
  const [votingEndTime, setVotingEndTime] = useState(0);
  const [projectName,setprojectName]=useState("");
  
  const contract = useContext(ContractContext); // Use context to get the contract

  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        try {
          // Fetch both endTime and votingEndTime from the contract
          const endTime = await contract.endTime(); 
          const votingEndTime = await contract.votingEndTime(); 
          const projectname = await contract.projectName(); 


          setprojectName(projectname);
          setEndTime(Number(endTime) * 1000); // Store endTime as milliseconds
          setVotingEndTime(Number(votingEndTime) * 1000); // Store votingEndTime as milliseconds
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      }
    };

    fetchData();
  }, [contract]);

  // Countdown for endTime
  useEffect(() => {
    if (endTime) {
      const timerId = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setDays(days);
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds);
        } else {
          clearInterval(timerId);
        }
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [endTime]);

  // Countdown for votingEndTime
  useEffect(() => {
    if (votingEndTime) {
      const timerId = setInterval(() => {
        const now = new Date().getTime();
        const distance = votingEndTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setVotingDays(days);
          setVotingHours(hours);
          setVotingMinutes(minutes);
          setVotingSeconds(seconds);
        } else {
          clearInterval(timerId);
        }
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [votingEndTime]);

  return (
    <>
      <section className="awards padding">
        <div className="container">
          <Heading  title={projectName} subtitle="Our Project" />

         
            <div className="countdown">
              
              <div className="time">
                <div>{days}</div>
                <p>Days</p>
              </div>
              <div className="time">
                <div>{hours}</div>
                <p>Hour</p>
              </div>
              <div className="time">
                <div>{minutes}</div>
                <p>Minute</p>
              </div>
              <div className="time">
                <div>{seconds}</div>
                <p>Second</p>
              </div>
              <p>Left for projrct completion</p>
            </div>
          

            <div className="countdown2">
              <div className="time">
                <div>{votingDays}</div>
                <p>Days</p>
              </div>
              <div className="time">
                <div>{votingHours}</div>
                <p>Hour</p>
              </div>
              <div className="time">
                <div>{votingMinutes}</div>
                <p>Minute</p>
              </div>
              <div className="time">
                <div>{votingSeconds}</div>
                <p>Second</p>
              </div>
              <p>Left for voting completion</p>
            </div>
          


        </div>
      </section>
    </>
  );
};

export default Awards;
