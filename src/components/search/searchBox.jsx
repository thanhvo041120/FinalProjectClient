import React, { useRef, useState } from "react";
import { TextField } from "../../../node_modules/@mui/material/index";

const SearchBox = (props) => {
  const { onSubmit } = props;
  const [search, setSearch] = useState("");
  const collecting = useRef(null);
  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    if (!onSubmit) return;
    e.preventDefault();
    if (collecting.current) {
      clearTimeout(collecting.current);
    }

    collecting.current = setTimeout(() => {
      onSubmit(value);
    }, 350);
  };
  return (
    <div>
      <TextField
        sx={{
          width: "100%",
          input: {
            color: "#FFFFFF",
            padding: "10px",
            fontSize: 18,
            fontWeight: "bold",
          },
        }}
        placeholder="Search"
        size="small"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
