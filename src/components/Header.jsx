import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context,server } from '../main';
import toast from "react-hot-toast";
import axios from 'axios';


const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const logoutHandler = async (e) => {
    
    try{
        const { data } = await axios.post(`${server}/users/logout`,{
        },{
           
            withCredentials:true,
            
        }
        
        );
        setIsAuthenticated(false);
        toast.success(data.message);
        console.log("message",data.message)
        
    }
    catch(error){
        setIsAuthenticated(true);

        toast.error(error.response.data.message);
        console.log(error.response.data.message);
    }

}
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? <button onClick={logoutHandler} className="btn">Logout</button> :
          <Link to={"/login"}>Login</Link>
        }

      </article>
    </nav>
  )
}

export default Header