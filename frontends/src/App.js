import React, { useState } from "react";
import { ethers } from "ethers";

import CONTRACT_ABI from "./abi.json";

const CONTRACT_ADDRESS = "0xBFa8c25213b9Edf27718865d0985a14d4db1cAB9";

export default function App() {
  const { Contract, BrowserProvider } = ethers;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function updateStudentName() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const transaction = await contract.updateStudentName(nameInput);
        await transaction.wait();
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function updateStudentAge() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const transaction = await contract.updateStudentAge(
          parseInt(ageInput, 10)
        );

        await transaction.wait();
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function getStudentDetails() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      console.log("loogging1");
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      console.log("loogging2");
      try {
        const entityDetailsPromise = await contract.getStudentDetails();
        const entityDetails = await entityDetailsPromise;
        console.log("loogging", entityDetails);

        const { name, age } = entityDetails;

        document.getElementById("display").innerHTML = `${name} ${age}`;
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </label>
        <button onClick={updateStudentName} disabled={isLoading}>
          updateStudentName
        </button>

        <label>
          Age:
          <input
            type="number"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
          />
        </label>
        <button onClick={updateStudentAge} disabled={isLoading}>
          updateStudentAge
        </button>

        <button onClick={getStudentDetails} disabled={isLoading}>
          getStudentDetails
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred.</p>}

      <div id="display"></div>
    </div>
  );
}

