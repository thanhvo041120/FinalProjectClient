import rootInstance from "utils/axios.config";

export const getBooks = async (page, limit) => {
  try {
    let URL;
    if (limit && page) {
      URL = `/book/list?page=${page}&limit=${limit}`;
    } else {
      URL = `/book/list`;
    }

    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const countBooks = async () => {
  try {
    const URL = `/book/count`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBooksByCategory = async (page, limit, categoryId) => {
  try {
    const URL = `/book/bookByCategory/${categoryId}?page=${page}&limit=${limit}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBooksLengthByCategory = async (categoryId) => {
  try {
    const URL = `/book/length/${categoryId}`;
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

export const createBook = async (data) => {
  try {
    const URL = "/book/create";
    const response = await rootInstance.post(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateBooks = async (data, bookId) => {
  try {
    const URL = `update/${bookId}`;
    const response = await rootInstance.patch(URL, data);
    console.log(
      "🚀 ~ file: book.api.js ~ line 72 ~ updateBooks ~ response",
      response
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
