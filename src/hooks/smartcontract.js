import { ethers } from "ethers";
import abi from "./abi.json";

export const createBookContract = async (
  bookId,
  bookName,
  total,
  walletAddress
) => {
  const contractAddress = "0x5f31703e3750a6f0c6d3005782d4f5cFDF310D55";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (window.ethereum) {
    await provider.send("eth_requestAccounts", []);
  }
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (address.toLowerCase() !== walletAddress.toLowerCase()) {
    return {
      code: -1,
      message: "Wrong wallet",
    };
  }
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.CreateBookStorage(bookName, bookId, total);
    const receipt = await tx.wait();
    return receipt.events[0].args.contractAddress;
  } catch (error) {
    if (error) {
      return {
        code: -1,
        message: error.code,
      };
    }
  }
};
export const getBookContractAddress = async () => {
  try {
    const contractAddress = "0x5f31703e3750a6f0c6d3005782d4f5cFDF310D55";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const address = await contract.ViewLatestAddressOfStrorageContract();
    return address;
  } catch (error) {
    console.log(
      "🚀 ~ file: smartcontract.js:36 ~ getBookContractAddress ~ error",
      error
    );
  }
};

export const getBorrowers = async (bookContracAddress) => {
  const contractAddress = "0x5f31703e3750a6f0c6d3005782d4f5cFDF310D55";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (window.ethereum) {
    await provider.send("eth_requestAccounts", []);
  }
  const signer = provider.getSigner();
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const borrower = await contract.ViewOwner(bookContracAddress);
    return borrower;
  } catch (error) {
    console.log("🚀 ~ file: smartcontract.js:40 ~ getBorrowers ~ error", error);
  }
};

export const getListBorrowers = async (bookAddressesArray) => {
  const contractAddress = "0x5f31703e3750a6f0c6d3005782d4f5cFDF310D55";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (window.ethereum) {
    await provider.send("eth_requestAccounts", []);
  }
  const signer = provider.getSigner();
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const borrowers = await contract.ViewListOwners(bookAddressesArray);
    return borrowers;
  } catch (error) {
    console.log(
      "🚀 ~ file: smartcontract.js:71 ~ getListBorrowers ~ error",
      error
    );
  }
};

export const borrow = async (bookAddress, walletAddress) => {
  const contractAddress = "0x5f31703e3750a6f0c6d3005782d4f5cFDF310D55";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (window.ethereum) {
    await provider.send("eth_requestAccounts", []);
  }
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (address.toLowerCase() !== walletAddress.toLowerCase()) {
    return {
      code: -1,
      message: "Wrong wallet",
    };
  }
  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.BorrowBook(bookAddress);
    const receipt = await tx.wait();
    return {
      code: 200,
      message: receipt
    };
  } catch (error) {
    console.log("🚀 ~ file: smartcontract.js:92 ~ borrow ~ error", error);
    return {
      code: -1,
      message: error.code,
    };
  }
};
