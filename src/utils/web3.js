/**
 * Web3 Utility Functions
 * Helper functions for blockchain interactions
 */

// Contract addresses (replace with actual contract addresses when deployed)
const CONTRACT_ADDRESSES = {
  HELO_TOKEN: '0x0000000000000000000000000000000000000000', // Replace with actual token contract
  ORB_NFT: '0x0000000000000000000000000000000000000000',   // Replace with actual NFT contract
  STAKING: '0x0000000000000000000000000000000000000000'    // Replace with actual staking contract
};

// ABI definitions (simplified for demo)
const TOKEN_ABI = [
  // ERC-20 standard functions
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

const NFT_ABI = [
  // ERC-721 standard functions
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
];

/**
 * Initialize contract instances
 * @param {Object} web3 - Web3 instance
 * @returns {Object} Contract instances
 */
function initContracts(web3) {
  try {
    // Initialize token contract
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, CONTRACT_ADDRESSES.HELO_TOKEN);
    
    // Initialize NFT contract
    const nftContract = new web3.eth.Contract(NFT_ABI, CONTRACT_ADDRESSES.ORB_NFT);
    
    console.log("Contracts initialized");
    
    return {
      tokenContract,
      nftContract
    };
  } catch (error) {
    console.error("Error initializing contracts:", error);
    return null;
  }
}

/**
 * Get token balance
 * @param {Object} tokenContract - Token contract instance
 * @param {string} address - User address
 * @returns {Promise<string>} Token balance
 */
async function getTokenBalance(tokenContract, address) {
  try {
    const balance = await tokenContract.methods.balanceOf(address).call();
    const decimals = await tokenContract.methods.decimals().call();
    
    // Convert from wei to token units
    return (balance / Math.pow(10, decimals)).toString();
  } catch (error) {
    console.error("Error getting token balance:", error);
    return "0";
  }
}

/**
 * Get ETH balance
 * @param {Object} web3 - Web3 instance
 * @param {string} address - User address
 * @returns {Promise<string>} ETH balance
 */
async function getEthBalance(web3, address) {
  try {
    const balance = await web3.eth.getBalance(address);
    
    // Convert from wei to ETH
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error("Error getting ETH balance:", error);
    return "0";
  }
}

/**
 * Get NFTs owned by user
 * @param {Object} nftContract - NFT contract instance
 * @param {string} address - User address
 * @returns {Promise<Array>} Array of NFT IDs
 */
async function getUserNFTs(nftContract, address) {
  try {
    const balance = await nftContract.methods.balanceOf(address).call();
    const nftIds = [];
    
    // Get all NFT IDs owned by user
    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.methods.tokenOfOwnerByIndex(address, i).call();
      nftIds.push(tokenId);
    }
    
    return nftIds;
  } catch (error) {
    console.error("Error getting user NFTs:", error);
    return [];
  }
}

/**
 * Get NFT metadata
 * @param {Object} nftContract - NFT contract instance
 * @param {string} tokenId - NFT token ID
 * @returns {Promise<Object>} NFT metadata
 */
async function getNFTMetadata(nftContract, tokenId) {
  try {
    const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
    
    // Fetch metadata from URI
    const response = await fetch(tokenURI);
    const metadata = await response.json();
    
    return metadata;
  } catch (error) {
    console.error("Error getting NFT metadata:", error);
    return null;
  }
}

/**
 * Send transaction
 * @param {Object} web3 - Web3 instance
 * @param {Object} tx - Transaction object
 * @param {string} from - Sender address
 * @returns {Promise<string>} Transaction hash
 */
async function sendTransaction(web3, tx, from) {
  try {
    // Estimate gas
    const gas = await web3.eth.estimateGas({
      ...tx,
      from
    });
    
    // Get gas price
    const gasPrice = await web3.eth.getGasPrice();
    
    // Send transaction
    const receipt = await web3.eth.sendTransaction({
      ...tx,
      from,
      gas,
      gasPrice
    });
    
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
}

/**
 * Get chain name from chain ID
 * @param {number} chainId - Chain ID
 * @returns {string} Chain name
 */
function getChainName(chainId) {
  const chains = {
    1: "Ethereum Mainnet",
    3: "Ropsten Testnet",
    4: "Rinkeby Testnet",
    5: "Goerli Testnet",
    42: "Kovan Testnet",
    56: "Binance Smart Chain",
    137: "Polygon Mainnet",
    80001: "Mumbai Testnet"
  };
  
  return chains[chainId] || `Unknown Chain (${chainId})`;
}

/**
 * Get explorer URL for chain
 * @param {number} chainId - Chain ID
 * @returns {string} Explorer URL
 */
function getExplorerUrl(chainId) {
  const explorers = {
    1: "https://etherscan.io",
    3: "https://ropsten.etherscan.io",
    4: "https://rinkeby.etherscan.io",
    5: "https://goerli.etherscan.io",
    42: "https://kovan.etherscan.io",
    56: "https://bscscan.com",
    137: "https://polygonscan.com",
    80001: "https://mumbai.polygonscan.com"
  };
  
  return explorers[chainId] || "https://etherscan.io";
}

// Export functions
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    CONTRACT_ADDRESSES,
    TOKEN_ABI,
    NFT_ABI,
    initContracts,
    getTokenBalance,
    getEthBalance,
    getUserNFTs,
    getNFTMetadata,
    sendTransaction,
    getChainName,
    getExplorerUrl
  };
}
