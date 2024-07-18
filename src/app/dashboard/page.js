"use client"
import React from 'react'
import Button from '../components/button'

const DashboardPage = () => {
    const handleClick  = async() =>{

        try {
          const response = await fetch("/api/mix-panel-info", {
              method: "GET",
            });
          
            const data = await response.json();
      
            console.log(data);
          
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
          
        }
    }
  return (
    <div>
        <h2>DashboardPage</h2>
        <Button onClick={handleClick}>
            <p>Get</p>
        </Button>
    </div>
  )
}

export default DashboardPage