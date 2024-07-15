"use client"

import Button from './button'
import axios from 'axios'

const ConnectionSender = () => {

    const handleClick =async ()=>{

    const linkedinAuthorization = await axios.post('https://qyf4aviui4.execute-api.eu-north-1.amazonaws.com/default/linkedin-crawler',
         {
        totalLettersPerDay: filters.connections,
        searchTags : filters?.keyWords,
        levelOfTarget: 1,
        id: '66912ddf65ef3fdd9771aab3',
        searchFilters : { 
            "Locations": filters.locations, 
            "Industry":  filters.industries,
          }, 
        

      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 600000 
      });

      console.log(linkedinAuthorization);

    }

  return (
    <>
    <Button onClick={handleClick} className="btn-primary">
        <span>
            Send Connections
        </span>
    </Button>
    </>
  )
}

export default ConnectionSender