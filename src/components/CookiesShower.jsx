import React, { useState, useEffect } from "react";
import "./cookies.css";

export const CookiesShower = ({ show }) => {
  const [cookies, setCookies] = useState([]);
  const [isRaining, setIsRaining] = useState(true);
  if (!show) return null;

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("isRaining:", isRaining);
    const makeShower = () => {
      const cookie = [];
      for (let i = 0; i < 50; i++) {
        cookie.push({
          id: i,
          left: Math.random() * 100 + "vw",
          animationDelay: Math.random() * 5 + "s",
        });
      }
      console.log(cookie);
      setCookies(cookie);
    };

    if (isRaining) {
      makeShower();
      console.log("Generating cookies...");

      setTimeout(() => {
        console.log("Stopping rain...");
        setIsRaining(false);
      }, 4000);
    }
  }, [isRaining]);

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
