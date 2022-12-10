import rootInstance from "utils/axios.config";

export const addAuthor = async (data) => {
  try {
    const URL =  "/author/create";
    const response = await rootInstance.post(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateAuthor = async (authorId, data) => {
  try {
    const URL =`/author/update/${authorId}`;
    const response = await rootInstance.patch(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteAuthor = async (authorId) => {
  try {
    const URL = `/author/delete/${authorId}`;
    const response = await rootInstance.delete(URL);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const findAllAuthor = async () => {
  try {
    const URL = "/author/authors";
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const findAuthorById = async (authorId) => {
  try {
    const URL = `/author/getAuthor/${authorId}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
