import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Register.css'; // Import your CSS file for styling

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    let navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, { displayName: name });
            navigate('/');
        } catch (error) {
            toast(error.code, { type: "error" });
        }
    };

    return (
        <div className='wrapper'>
            <form className='registerform' >
                <h1>Register</h1>
                <div className='inputbox'>
                    <label>Name</label>
                    <input
                        type='text'
                        placeholder='Name'
                        className='formcontrol'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button className='buton' type='button' onClick={handleSignup}>
                     Sign Up
                </button>
                <div className='register-link'>
                    <p>Already have an account? <a><Link to='/signin'>Login</Link></a></p>
                </div>
            </form>
        </div>
    );
}

