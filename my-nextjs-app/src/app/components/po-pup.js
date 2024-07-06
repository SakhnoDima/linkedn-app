"use client";
import { useState } from "react";

const Popup = () => {
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pass", pass);

    const response = await fetch('/api/save-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass }),
      });

  };

  return (
    <div>
      <p>Add your password</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Send Pass</button>
      </form>
    </div>
  );
};

export default Popup;
