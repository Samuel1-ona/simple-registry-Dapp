
# Simple School Registry Smart Contract

This Solidity smart contract, SimpleSchoolRegistry, provides a basic example of managing and storing student information on the Ethereum blockchain. It's designed to operate with Solidity version 0.8.19 and offers functionalities to set initial student details, update them, and retrieve them as needed.
Features

  Initial Setup: Through the constructor, it allows the initialization of a student's name and age upon deployment of the contract.
  Update Functionality: Provides separate functions to update the student's name and age.
  Retrieval Functionality: Includes a function to retrieve the current set name and age of the student.

# Functions
Constructor

solidity

```constructor(string memory name, uint age)```

  Initializes the contract with the student's name and age.
    Parameters:
        name: The name of the student.
        age: The age of the student.

# updateStudentName

solidity

```function updateStudentName(string memory newName) public```

   Updates the student's name stored in the contract.
    Parameters:
        newName: The new name to update the student's name to.

# updateStudentAge

solidity

```function updateStudentAge(uint newAge) public```

  Updates the student's age stored in the contract.
    Parameters:
        newAge: The new age to update the student's age to.

# getStudentDetails

solidity

```function getStudentDetails() public view returns (string memory name, uint age)```

   Retrieves the current student's name and age.
    Returns:
        name: The current name of the student stored in the contract.
        age: The current age of the student stored in the contract.

How to Use

   Deployment: When deploying the contract, specify the initial name and age of the student in the constructor arguments.

   Updating Information: Call updateStudentName or updateStudentAge with the appropriate arguments to update the student's information. These functions are accessible to any caller.

   Retrieving Information: Call getStudentDetails to retrieve the current name and age of the student. This function can be called by any external caller and does not require a transaction as it does not modify state (view function)




Usage

  Connect to MetaMask: Upon loading the application, connect your MetaMask wallet by clicking the browser extension and signing the connection request.

   Update Student Information:
        Enter a new name in the "Name" input field and click the "updateStudentName" button to update the student's name.
        Enter a new age in the "Age" input field and click the "updateStudentAge" button to update the student's age.
        Confirm the transaction in MetaMask and wait for it to be processed.

  Retrieve Student Information: Click the "getStudentDetails" button to fetch the current student information from the smart contract. The details will be displayed on the page.

The application should now be running and accessible at http://localhost:3000.
