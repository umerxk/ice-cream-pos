import Crud from "./Crud";
import UserProfile from "./UserProfile";
import SignUp from "./SignUp";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const UserContext = createContext({
  user: {},
  setCurrentUser: {},
} as any);

function App() {
  const [user, setUser] = useState({});

  const setCurrentUser = (value: {}) => {
    console.log(value);
    setUser(value);
  };

  const cvalue = {
    user,
    setCurrentUser,
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={cvalue}>
        <UserProfile/>
        <Routes>
          <Route element={<Crud />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
