"use client"
import { useState } from "react";
import ConnectionForm from "../components/connection-form";
import UsersLinkedinFilters from "../components/user-linkedin-filters";


const FiltersBlock = () => {
    const [filters, setFilters] = useState([])
  return (
    <div className="py-[50px] ">
      <h2 className="text-3xl text-center mb-[8px] font-bold ">
        Connecting Form
      </h2>
      <p className="text-center mb-[12px]">
        Here you can specify the filters you need for the target and send
        requests
      </p>
      <ConnectionForm setFilters={setFilters}/>
      <UsersLinkedinFilters filters={filters} setFilters={setFilters}/>
    </div>
  );
};

export default FiltersBlock