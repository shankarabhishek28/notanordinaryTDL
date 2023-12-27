import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { Link, Navigate } from 'react-router-dom'

import { Context, server } from '../main';

import axios from 'axios';
import TodoItem from './TodoItem';
const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated} = React.useContext(Context);

  const updateHandler = async (id) => {
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},
      {
        withCredentials:true,
      })
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,
      {
        withCredentials:true,
      })
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/task/new`, {
        title, description,
      }, {
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          },
      });
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);

    }
    catch (error) {
      toast.error("error occured")
      setLoading(false);
    }
  }
  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials:true,
    }).then((res) => {
      console.log(res.data)
      setTasks(res.data.tasks)
    }).catch((e) => {
      toast.error(e.response.data.message);
    })
  },[refresh]);
  if (isAuthenticated === false) return <Navigate to='/login' />

  return (
    <div className="container">
      <div className="login">
        <section className="todoContainer">
          <form onSubmit={submitHandler} >
            <input required type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />

            <input required type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />

            <button disabled = {loading} type='submit'>Add Task</button>
          </form>
        </section>

      </div>
      <section className="todosContainer">
        {
          tasks.map((i) => (
            <TodoItem title={i.title}
             description={i.description}
             isCompleted = {i.isCompleted}
             updateHandler = {updateHandler}
             deleteHandler = {deleteHandler}
             id = {i._id}
             key = {i._id}
             />
          ))
        }
      </section>
    </div>
  )
}

export default Home