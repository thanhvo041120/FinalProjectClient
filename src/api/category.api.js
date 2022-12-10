import rootInstance from "utils/axios.config";


export const addCategory = async (data) => {
  try {
    const URL = "/category/create";
    const response = await rootInstance.post(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateCategory = async (categoryId, data) => {
  try {
    const URL = `/category/update/${categoryId}`;
    const response = await rootInstance.patch(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
}
export const findAllCategory = async () => {
  try {
    const URL = "/category/categories";
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const findCategoryById = async (categoryId) => {
  try {
    const URL = `/category/categoryById/${categoryId}`;
    const response = await rootInstance.get(URL);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const URL = `/category/delete/${categoryId}`;
    const response = await rootInstance.delete(URL);
    return response;
  } catch (error) {
    return error
  }
}

