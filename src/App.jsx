import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Login from "./pages/login";
import { Context,server } from './main';
import React from 'react'

import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from 'axios';


function App() {
  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);
  // const [loader,setLoader] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    }).then(res=>{
       setUser(res.data.user) ;
       setIsAuthenticated(true); 
       setLoading(false);
      })
       
       .catch((error)=>{
        toast.error("LogIn first")

        setUser({});
        setLoading(false);
        
       })
  },[setUser])
  // if(loader){
  //   return <div>loading....</div>
  // }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
