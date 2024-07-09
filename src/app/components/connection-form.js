"use client";
import { useState } from "react";
import Input from "./input";
import Button from "./button";

const ConnectionForm = () => {
  const [connections, setConnections] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [locations, setLocations] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(connections);
    console.log(keyWords);
    console.log(locations.split(","));
    console.log(title);
    console.log(language.split(","));
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
          value={connections}
          setValue={setConnections}
        />
      </label>

      <label className="flex flex-col space-y-2">
        2. Add keywords.
        <Input
          secondary
          name="keyWords"
          type="text"
          placeholder="Keywords"
          value={keyWords}
          setValue={setKeyWords}
        />
      </label>
      <label className="flex flex-col space-y-2">
        3. Add Locations (There may be several. Separate the values ​​with a comma).
        <Input
          secondary
          name="locations"
          type="text"
          placeholder="Locations"
          value={locations}
          setValue={setLocations}
        />
      </label>
      <label className="flex flex-col space-y-2">
        4. Add Title.
        <Input
          secondary
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          setValue={setTitle}
        />
      </label>
      <label className="flex flex-col space-y-2">
        4. Add Profile language. (There may be several. Example: en, fr, es, ru).
        <Input
          secondary
          name="languages"
          type="text"
          placeholder="Languages"
          value={language}
          setValue={setLanguage}
        />
      </label>
      
      <Button type="submit" style="">
        <p>Connecting</p>
      </Button>
    </form>
  );
};

export default ConnectionForm;
