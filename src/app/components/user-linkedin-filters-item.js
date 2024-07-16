import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { useToastContext } from "../context/toast-context";

const UserLinkedinFiltersItem = ({ data, index, setFilters }) => {
  const showToast = useToastContext();
  const handleClick = async () => {
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
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api/linkedin-filters", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: data._id,
        },
      });

      setFilters((prev) => prev.filter((element) => element._id !== data._id));
      showToast("Filter removed successfully", "success");
    } catch (error) {
      console.log(error?.response.data.message);
      showToast(error?.response.data.message, "error");
    }
  };
  return (
    <tr>
      <td>{data.connections}</td>
      <td>{data.keyWords}</td>
      <td>{data.locations.join(", ")}</td>
      <td>{data.title}</td>
      <td>{data.industries.join(", ")}</td>
      <td>{data.languages.join(", ")}</td>
      <td
        onClick={handleClick}
        className="underline hover:text-blue-600 hover:cursor-pointer"
      >
        Click to start connections
      </td>
      <td>
        <MdDeleteOutline
          onClick={handleDelete}
          className="hover:fill-red-700 hover:cursor-pointer hover:scale-125"
        />
      </td>
    </tr>
  );
};

export default UserLinkedinFiltersItem;
