// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract BookStorageContract {
    event BorrowEvent(address to);
    
    address public currentOwner;
    struct BookInformation{
        string bookName;
        uint bookId;
    }    
    BookInformation public book;

    constructor(string memory _bookName, uint _bookId, address owner) {
        currentOwner = owner;
        book.bookName = _bookName;
        book.bookId = _bookId;
    }

    function Borrow(address nextBorrower) public {
        currentOwner = nextBorrower;
        emit BorrowEvent(nextBorrower);
    }
    function View () public view returns(address){
        return currentOwner;
    }
}

