require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { URL, KEY, ETH } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: URL,
      accounts: [`0x${KEY}`],
    },
  },
  etherscan: {
    apiKey: ETH,
  },
};
