import { borrow, createBookContract } from "hooks/smartcontract";
import rootInstance from "utils/axios.config";

export const deleteBookInDatabase = async (bookId) => {
  try {
    const URL = `/book/delete/${bookId}`;
    const response = await rootInstance.delete(URL);
    console.log(
      "🚀 ~ file: book.api.js:128 ~ deleteBookInDatabase ~ response",
      response
    );
    return response.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: book.api.js:125 ~ deleteBookInDatabase ~ error",
      error
    );
  }
};

export const getBooks = async (page, limit, query) => {
  try {
    let URL;
    if (limit && page) {
      if (query) {
        URL = `/book/list?page=${page}&limit=${limit}&query=${query}`;
      } else {
        URL = `/book/list?page=${page}&limit=${limit}`;
      }
    } else {
      URL = `/book/list`;
    }
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const countBooks = async (searchItem) => {
  try {
    let URL;
    if (searchItem) {
      URL = `/book/count?query=${searchItem}`;
    } else {
      URL = `/book/count`;
    }
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBooksByCategory = async (page, limit, categoryId, query) => {
  try {
    let URL;
    if (query) {
      URL = `/book/bookByCategory/${categoryId}?page=${page}&limit=${limit}&query=${query}`;
    } else {
      URL = `/book/bookByCategory/${categoryId}?page=${page}&limit=${limit}`;
    }
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBooksLengthByCategory = async (categoryId, query) => {
  try {
    let URL;
    if (query) {
      URL = `/book/length/${categoryId}?query=${query}`;
    } else {
      URL = `/book/length/${categoryId}`;
    }
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBookById = async (bookId) => {
  try {
    const URL = `/book/bookById/${bookId}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const createBook = async (data, wallet) => {
  try {
    const URL = "/book/create";
    const response = await rootInstance.post(URL, data);
    const tx = await createBookContract(
      response.data.data.bookId,
      data.name,
      data.total,
      wallet
    );
    if (tx.code === -1) {
      const URLDelete = `/book/delete/${response.data.data.bookId}`;
      try {
        await rootInstance.delete(URLDelete);
        return {
          status: 501,
          response: tx.message,
        };
      } catch (error) {
        console.log("🚀 ~ file: book.api.js:104 ~ createBook ~ error", error);
      }
    } else {
      return {
        status: 201,
        response: response.data,
        tx: tx,
      };
    }
  } catch (error) {
    return error.response;
  }
};

export const updateBooks = async (data, bookId) => {
  try {
    const URL = `/book/update/${bookId}`;
    const response = await rootInstance.patch(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const hashAddress = async (data, staffId) => {
  try {
    const URL = `/book/hash/${staffId}`;
    const response = await rootInstance.post(URL, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getSADetail = async (bookId) => {
  try {
    const URL = `/book/books/SADetails/${bookId}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const borrowBook = async (data, bookAddress, wallet) => {
  try {
    const URL = `/book/borrow`;
    const response = await rootInstance.post(URL, data);
    const tx = await borrow(bookAddress, wallet);
    if (tx.code === -1) {
      try {
        const URL = `/book/deleteFailBorrow/${response.data.data.affectedRow[0].id}`;
        await rootInstance.delete(URL);
        return {
          status: 501,
          result: tx.message,
        };
      } catch (error) {
        console.log("🚀 ~ file: book.api.js:168 ~ borrowBook ~ error", error);
      }
    } else {
      return {
        status: 201,
        result: response.data.data.affectedRow[0].id,
        tx: tx,
      };
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: book.api.js:113 ~ borrowBook ~ error",
      error.message
    );
  }
};

export const getOverdueBorrowers = async () => {
  try {
    const URL = `/book/borrowersOverDate`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllBorrowers = async () => {
  try {
    const URL = `/book/borrowers`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error;
  }
}