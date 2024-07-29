import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Login.css';
export default function Login() {
    let navigate=useNavigate();
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const handleLognin=async()=>{
        try{
        await signInWithEmailAndPassword(auth,email,password);
        navigate('/');
        }catch(error){
            toast(error.code,{type:"error"})
        }
        

    }
  return (
    <div className='maincontainer' >
      <h1>Login</h1>
      <div className='formgroup'>
            <label>Email ID</label>
            <input
            type='email'
            className='formcontrol'
            placeholder='Enter your Email'
            onChange={(e)=>{setEmail(e.target.value)}}
            />
        </div>
        <div className='formgroup'>
            <label>Password</label>
            <input
            type='password'
            className='formcontrol'
            placeholder='Enter your Password'
            onChange={(e)=>{setPassword(e.target.value)}}
            />
        </div>
<button className='buton' onClick={handleLognin}>Log in</button>
<div className='register-link'>
                    <p>Don't have an account? <a><Link to='/register'>Register</Link></a></p>
                </div>
    </div>
  )
}

