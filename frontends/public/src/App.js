import React, { useState } from "react";
import { ethers } from "ethers";

import CONTRACT_ABI from "./abi.json";

const CONTRACT_ADDRESS = "0x6D843D6D007663A66AcD7C179b5C7c4da8D13979";

export default function App() {
  const { Contract, BrowserProvider } = ethers;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function updateName() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const transaction = await contract.updateName(nameInput);
        await transaction.wait();
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function updateAge() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const transaction = await contract.updateAge(parseInt(ageInput, 10));
        await transaction.wait();
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function getEntityDetails() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const entityDetailsPromise = contract.getEntityDetails();
        const entityDetails = await entityDetailsPromise;

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
        <button onClick={updateName} disabled={isLoading}>
          Update Name
        </button>

        <label>
          Age:
          <input
            type="number"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
          />
        </label>
        <button onClick={updateAge} disabled={isLoading}>
          Update Age
        </button>

        <button onClick={getEntityDetails} disabled={isLoading}>
          Get Entity Details
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred.</p>}

      <div id="display"></div>
    </div>
  );
}

// import React, { useState } from "react";
// import { ethers } from "ethers";

// import CONTRACT_ABI from "./abi.json";

// const CONTRACT_ADDRESS = "0x6D843D6D007663A66AcD7C179b5C7c4da8D13979";

// export default function App() {
//   const { Contract, BrowserProvider } = ethers;
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   async function requestAccount() {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//   }

//   async function updateName() {
//     setIsLoading(true);
//     if (typeof window.ethereum !== "undefined") {
//       await requestAccount();
//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//       try {
//         const transaction = await contract.updateName("Onanike Samuel chisom");
//         await transaction.wait();
//       } catch (error) {
//         setIsError(true);
//       }
//     }
//   }

//   async function updateAge() {
//     setIsLoading(true);
//     if (typeof window.ethereum !== "undefined") {
//       await requestAccount();
//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//       try {
//         const transaction = await contract.updateAge(25);
//         await transaction.wait();
//       } catch (error) {
//         setIsError(true);
//       }
//     }
//   }

//   async function getEntityDetails() {
//     setIsLoading(true);
//     if (typeof window.ethereum !== "undefined") {
//       await requestAccount();
//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//       try {
//         // Await the result of getEntityDetails
//         const entityDetailsPromise = contract.getEntityDetails();

//         // If getEntityDetails returns a Promise, await its resolution
//         const entityDetails = await entityDetailsPromise;

//         // Access the properties directly
//         const { name, age } = entityDetails;

//         document.getElementById("display").innerHTML = `${name} ${age}`

//         console.log( name,  age);
//       } catch (error) {
//         setIsError(true);
//       }
//     }
//   }

//   return (
//     <div>
//       <button onClick={updateName}>Update Name</button>
//       <button onClick={updateAge}>Update Age</button>
//       <button onClick={getEntityDetails}>Get Entity Details</button>
//       <div id="display"></div>
//     </div>
//   );
// }
