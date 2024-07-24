import React, { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path to firebaseConfig.js
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import './Articles.css'; // Import the CSS file

const Articles = () => {
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);
  const articlesEndRef = useRef(null);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articlesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate() : null
        };
      });
      setArticles(articlesData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (articlesEndRef.current) {
      articlesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [articles]);

  return (
    <div className="contain">
      <div className="articles-container">
        {articles.length === 0 ? (
          <p>No messages found!</p>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className={`article-item ${
                article.email === user?.email ? 'my-message' : 'other-message'
              }`}
            >
              <div className="message-bubble">
                <h4 className="message-user">
                  {article.email === user?.email ? 'You' : article.username || 'Anonymous'}
                </h4>
                <p className="message-content">{article.description}</p>
                {article.createdAt && (
                  <p className="message-time">
                    {article.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={articlesEndRef} />
      </div>
    </div>
  );
};

export default Articles;
