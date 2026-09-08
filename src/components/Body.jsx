import React, {useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { addUser} from '../utils/userSlice';
import { useSelector } from 'react-redux';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    if(userData) return;
    try{
    const res = await axios.get(`${BASE_URL}/profile/view`, {
      withCredentials: true,
    });
    dispatch(addUser(res.data)); 
    } catch(err){
      if(err.status === 401){
      navigate('/login');    
      }
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body
