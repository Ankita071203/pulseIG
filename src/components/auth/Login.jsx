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
    <div className='wrapper'>
            <form className='registerform' >
                <h1>Log in</h1>
                <div className='inputbox'>
                <label>Email</label>
                    <input
                        type='email'
                        placeholder='Email'
                        className='formcontrol'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='inputbox'>
                <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        className='formcontrol'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='buton' type='button' onClick={handleLognin}>
                     Log in
                </button>
                <div className='register-link'>
                    <p>Dont't have an account? <a><Link to='/register'>Register</Link></a></p>
                </div>
            </form>
        </div>
  )
}

