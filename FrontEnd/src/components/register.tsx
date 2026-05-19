import React, { useState } from 'react'
import { register } from '../apis/authAPI'
import { useNavigate } from 'react-router-dom'


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  const fetchAUser = async () => {
    try {
      const response = await register(username, email, password)
      console.log('API Response:', response);
      if (!response.data.token) {
        alert("User not found")
      } else {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscription', "free");
        navigate("/pantry");

      }

    } catch (error) {
      console.log(error)
    }


  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAUser();
  };

  const handlePopUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setPopUp(!popUp);
  }

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9] h-[100vh] justify-center items-center content-center relative'>
      <div className='bg-[#F9F9F9] shadow-md scale-[97.5%] box-1 w-[90vw] z-3 p-5 px-7 md:w-[25vw] rounded-[20px]'>
        <p className='w-full text-center text-xl batman text-black font-bold'>Register</p>
        <form onSubmit={handleRegister}>
          <div className='flex flex-col'>
            <label className='text-black'>Email</label>
            <input name="email" className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <label className='text-black'>Username</label>
            <input name="email" className='  rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className='flex flex-col mt-4'>
            <label className='text-black'>Password</label>
            <input name="password" type='password' className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className='flex flex-col mt-4'>
            <label className='text-black'>Confirm Password</label>
            <input name="password" type='password' className=' rounded-[10px] bg-[#F9F9F9] border-2 border-[#167DE5] p-2 focus:bg-pink-200 transition duration-200' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>


          <div className='flex mt-2 flex-col'>
            <button type="submit" className='bg-[#167DE5] p-2 justify-center text-white text-center mt-5 rounded-[10px] bg-pink-400 hover:bg-pink-600 transition duration-200 batman'>Register</button>
            <p className='text-xs text-center mt-5'>Already have an account? <a href="/" className='font-bold text-[#167DE5] hover:text-pink-400 transition duration-200'>Login Now</a></p>


          </div>
        </form>

      </div>
      

    </div>
  )
}

export default Register
