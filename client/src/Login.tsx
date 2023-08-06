import { useState, useContext } from "react";
import { UserContext } from "./App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const userFields = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<any>(userFields);
  const { user, setCurrentUser } = useContext(UserContext);
  console.log({ user });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(userData);
    const { data } = await axios.post(
      "http://localhost:5001/auth/login",
      userData
    );
    setCurrentUser(data);
    navigate("/")
  };

  const handleForm = (e: any) => {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User Email</label>

      <input
        value={userData.email}
        name="email"
        type="email"
        onChange={handleForm}
      />
      <br />
      <br />
      <label>User Password</label>

      <input
        value={userData.password}
        name="password"
        type="password"
        onChange={handleForm}
      />
      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
export default Login;
