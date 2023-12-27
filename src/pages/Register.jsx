import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Context, server } from '../main';
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const {isAuthenticated,setIsAuthenticated,loading, setLoading} = useContext(Context);



    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(name,email,password);
        try{
            const { data } = await axios.post(`${server}/users/new`,{
                name,email,password
            },{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
                
            });
            setIsAuthenticated(true);
            toast.success(data.message);
            setLoading(false);
            
        }
        catch(error){
            setIsAuthenticated(false);

            toast.error(error.response.data.message);
            console.log(error);
            setLoading(false);
        }

    }
    if(isAuthenticated === true) return <Navigate to='/' />
    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input required type='text' placeholder='Name' value = {name} onChange={(e) => setName(e.target.value)} />
                    <input required type='email' placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)} />
                    <input required type='password' placeholder='Password'  value = {password} onChange={(e) => setPassword(e.target.value)} />
                    <button disabled = {loading} type='submit'>Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Login</Link>
                </form>
            </section>
        </div>)
}

export default Register