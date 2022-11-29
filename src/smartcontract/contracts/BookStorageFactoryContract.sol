// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./BookStorageContract.sol";
contract BookStorageFactoryContract {
    event ContractCreated (
        uint date,
        string _bookName,
        uint bookId,
        address owner,
        address contractAddress
    );
    BookStorageContract[] internal storageContractArray;
    mapping(address => uint) private addressToIndex;


    function CreateBookStorage(string memory _bookName, uint _bookId) public returns(address){
        BookStorageContract bookContract = new BookStorageContract(_bookName, _bookId,address(msg.sender));
        storageContractArray.push(bookContract);
        emit ContractCreated(
            block.timestamp,
            _bookName,
            _bookId,
            address(msg.sender),
            address(bookContract)
        );
        address subcontractaddress = address(bookContract);
        return subcontractaddress;
    }

    function BorrowBook (address _borrower, address contractAddress) public {
        BookStorageContract bookContract = storageContractArray[addressToIndex[contractAddress]];
        bookContract.Borrow(_borrower);
    }

    function ViewOwner (address contractAddress) public view returns(address){
        BookStorageContract bookContract = storageContractArray[addressToIndex[contractAddress]];
        return bookContract.View();
    }


}