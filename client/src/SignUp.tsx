import { useState } from "react";
import axios from "axios";

// interface userFieldsProps {
//     name: string,
//     email: string,
//     isAdmin: boolean,
//   };

const SignUp = () => {
  const userFields = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  };

  const [userData, setUserData] = useState<any>(userFields);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(userData);
    await axios.post("http://localhost:5001/auth/register", userData);
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
      <label>User Name</label>
      <input
        value={userData.name}
        name="name"
        type="text"
        onChange={handleForm}
      />
      <br />
      <br />
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

      <label>Is Admin ?</label>
      <select name="isAdmin" onChange={handleForm} value={userData.isAdmin}>
        <option value={"true"}>TRUE</option>
        <option value={"false"}>FALSE</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};
export default SignUp;
