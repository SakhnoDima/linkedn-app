import axios from "axios";


const UserLinkedinFiltersItem = ({ data, index}) => {
    const handleClick = async ()=>{

        // const linkedinAuthorization = await axios.post('https://qyf4aviui4.execute-api.eu-north-1.amazonaws.com/default/linkedin-crawler',
        //      {
        //     totalLettersPerDay: data.connections,
        //     searchTags : data?.keyWords,
        //     levelOfTarget: 1,
        //     id: data._id,//! не вірно 
        //     searchFilters : { 
        //         "Locations": data.locations, 
        //         "Industry":  data.industries,
        //       }, 
            
    
        //   }, {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     timeout: 600000 
        //   });
    
          console.log(data);
    
        }
  return (
    <tr>
    <td>{index + 1}</td>
    <td>{data.connections}</td>
    <td>{data.keyWords}</td>
    <td>{data.locations.join(", ")}</td>
    <td>{data.title}</td>
    <td>{data.industries.join(", ")}</td>
    <td>{data.languages.join(", ")}</td>
    <td onClick={handleClick} className="underline hover:text-blue-600 hover:cursor-pointer" >Click to start connections</td>
    
  </tr>
  )
}

export default UserLinkedinFiltersItem