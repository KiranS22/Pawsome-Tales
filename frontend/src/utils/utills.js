import axios from "axios";
const token = localStorage.getItem("token"); // Retrieve the token from localStorage

// function used to get loggedIn User when Application Loads
export const fetchUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/auth-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response.data.data.token = token;
    return response.data;
  } catch (err) {
    return { status: "error", message: err.message, where: err.stack };
  }
};
// Handle Login Form Submittion
export const logInUserCall = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      user
    );
    console.log("login user response from Utils in the frontend", response);

    return response;
  } catch (err) {
    console.log({ status: "Error", message: err.meesage });
  }
};

export const RegisterUserCall = async (user, value) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/register`,
      { ...user, tel: value }
    );

    return response;
  } catch (e) {
    console.log("Error:", e.message);
  }
};

export const fetchAllPostsAPICall = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/posts/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Error:", err.meesage, "Stack", err.stack);
  }
};

export const createPostAPICall = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/posts/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.log("Error:", err.meesage, "Stack", err.stack);
  }
};
