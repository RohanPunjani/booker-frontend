import jwt_decode from "jwt-decode";
import axios from "axios";

export const fetchUserFromToken = async (token) => {
  if (!token) return null;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/profile`,
      {
        headers,
      }
    );
    return response.data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
