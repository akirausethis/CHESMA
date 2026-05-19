
import React, { useEffect, useState } from 'react'
import { login } from '../apis/authAPI'
import { useNavigate } from 'react-router-dom'
import FrontCity from "../assets/FrontLogin.svg"
import BackCity from "../assets/BackLogin.svg"
import AirportCut from "../assets/AirportCut.svg"
import { useRef } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //   const fetchProfile = async () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) return;
    //     try {
    //       navigate("/Ventura/itineraries");
          
    //     } catch (error) {
    //       console.error('Failed to load user data', error);
    //     }
    //   }
    //   fetchProfile();
      
    // }, []);
        
    const fetchAUser = async () =>{
        try{
            const response = await login(username, password)
            console.log('API Response:', response);
              if(!response.data.token){
                alert("User not found")
              }else{
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', username);
                navigate("/pantry");
                
              }
          
        }catch(error){
            console.log(error)
        }
        
    
    }
    
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault(); 
      fetchAUser();
    };

  return (
    <div className='flex flex-col w-full h-[100vh] bg-[#F9F9F9] overflow-y-hidden justify-center items-center content-center relative'>
      <div className='bg-[#F9F9F9] shadow-md scale-[97.5%] box-1 w-[90vw] z-3 p-5 px-7 md:w-[25vw] rounded-[20px]'>
        <p className='w-full text-center text-2xl mb-5 batman text-black font-bold'>Login</p>
        <form onSubmit={handleLogin}>
            <div className='flex flex-col'>
            <label className='text-black'>Email</label>
            <input name="email" className=' rounded-[10px] bg-[#F9F9F9] border-2 border-brand-primary p-2 transition duration-200' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className='flex flex-col mt-5'>
            <label className='text-black'>Password</label>
            <input name="password" type='password' className=' rounded-[10px] bg-[#F9F9F9] border-2 border-brand-primary p-2 transition duration-200'value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='flex mt-4 flex-col'>
            <button type="submit" className='bg-[#167DE5] p-2 justify-center text-white text-center mt-5  shadow-lg shadow-green-200 rounded-[10px] bg-brand-primary hover:bg-brand-dark group-hover:scale-105 transition duration-200'>Login</button>
            
            <p className='text-xs text-center mt-5'>Don't have an account? <a href="/register" className='font-bold text-brand-primary hover:text-brand-dark transition duration-200'>Register Now</a></p>
            </div>
            </form>
        
      </div>
      
    </div>
  )
}

export default Login
