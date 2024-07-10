"use client";
import { FormEvent } from "react";

import Input from "./input";
import Button from "./button";

const ConnectionForm = () => {
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData.get("connections"));
    console.log(formData.get("keyWords"));
    console.log(formData.get("locations").split(","));
    console.log(formData.get("title"));
    console.log(formData.get("locations").split(","));


  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="flex flex-col space-y-2">
        1. Hom many connections would you like to send?
        <Input
          secondary
          name="connections"
          type="number"
          placeholder="Connections"
       
        />
      </label>

      <label className="flex flex-col space-y-2">
        2. Add keywords.
        <Input
          secondary
          name="keyWords"
          type="text"
          placeholder="Keywords"
       
        />
      </label>
      <label className="flex flex-col space-y-2">
        3. Add Locations (There may be several. Separate the values ​​with a comma).
        <Input
          secondary
          name="locations"
          type="text"
          placeholder="Locations"
        
        />
      </label>
      <label className="flex flex-col space-y-2">
        4. Add Title.
        <Input
          secondary
          name="title"
          type="text"
          placeholder="Title"
        
        />
      </label>
      <label className="flex flex-col space-y-2">
        4. Add Profile language. (There may be several. Example: en, fr, es, ru).
        <Input
          secondary
          name="languages"
          type="text"
          placeholder="Languages"
        
        />
      </label>
      
      <Button type="submit" style="">
        <p>Connecting</p>
      </Button>
    </form>
  );
};

export default ConnectionForm;
