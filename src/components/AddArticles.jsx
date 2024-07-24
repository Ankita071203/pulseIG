

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import './AddArticles.css';

export default function AddArticles() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    description: '',
    createdAt: Timestamp.now().toDate(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = () => {
    if (!formData.description) {
      alert('Please fill the message field');
      return;
    }

    if (!user) {
      toast('You need to be logged in to send a message', { type: 'error' });
      return;
    }

    const articleRef = collection(db, 'Articles');
    addDoc(articleRef, {
      email: user.email, // add the user's email
      username: user.displayName || user.email, // add the user's display name or email
      description: formData.description,
      createdAt: Timestamp.now().toDate(),
    })
      .then(() => {
        toast('Message sent successfully', { type: 'success' });
        setFormData({ description: '', createdAt: Timestamp.now().toDate() });
      })
      .catch((err) => {
        toast('Error sending message', { type: 'error' });
      });
  };

  return (
    <div className='form-container'>
      {!user ? (
        <div className='transparent-container' >
          <Link to='/signin'>Login to send a message </Link>
          Don't have an account? <Link to='/register'>Register</Link>
        </div>
      ) : (
        <>
          
          <textarea
            name='description'
            className='form-control description'
            placeholder='Enter your message'
            value={formData.description}
            onChange={handleChange}
          />
          <button className='submit-button' onClick={handlePublish} >
            Send
          </button>
        </>
      )}
    </div>
  );
}

