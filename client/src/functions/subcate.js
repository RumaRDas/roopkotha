import axios from "axios";

export const getSubCates = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subcates`);
};

export const getSubCate = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/subcate/${slug}`);
};

export const removeSubCate = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/subcate/${slug}`, {
    headers: { authtoken },
  });
};
export const updateSubCate = async (slug, category, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/subcate/${slug}`,
    category,
    {
      headers: { authtoken },
    }
  );
};

export const createSubCate = async (subcate, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/subcate`, subcate, {
    headers: { authtoken },
  });
};
