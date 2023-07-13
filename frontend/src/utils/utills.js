import axios from "axios";

// function used to get loggedIn User when Application Loads
export const getLoggedInUser = async () => {
  try {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/auth-user`,
      {
        withCredentials: true,
      }
    );
    console.log("Response From getLogged in user", response);
    return response;
    // {...respo}
    // if (response.data.status === "success") {
    //   const { user } = responsve.data;
    //   dispatch(logInUser(user));
    // }
  } catch (err) {
    console.log("something went wrong");
    // return {status: error, message:}
  }
};

// Handle Login Form Submittion
export const logInUserCall = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      user,
      { withCredentials: true }
    );

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
