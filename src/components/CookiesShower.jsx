import React, { useState, useEffect } from "react";
import "./cookies.css";

export const CookiesShower = () => {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    const makeShower = () => {
      const cookie = [];
      for (let i = 0; i < 50; i++) {
        cookie.push({
          id: i,
          left: Math.random() * 100 + "vw",
          animationDelay: Math.random() * 5 + "s",
        });
      }
      setCookies(cookie);
    };

    makeShower();
  }, []);

  return (
    <div className="cookie-container">
      {cookies.map((cookie) => (
        <div
          key={cookie.id}
          className="cookie"
          style={{
            left: cookie.left,
            animationDelay: cookie.animationDelay,
          }}
        ></div>
      ))}
    </div>
  );
};
