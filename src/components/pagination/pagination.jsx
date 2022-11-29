import React, { useEffect, useState } from "react";
import { Stack, Pagination } from "@mui/material";

const PaginationBar = ({ count, handleChange }) => {
  const [pagination, setPagination] = useState(null);
  const RenderPagination = () => {
    if (count < 6) {
      return (
        <Pagination
          count={1}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={2}
          size="large"
          variant="outlined"
          color="secondary"
        />
      );
    }
    if (count > 6 && count % 6 === 0) {
      return (
        <Pagination
          count={count / 6}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={2}
          size="large"
          variant="outlined"
          color="secondary"
          onChange={handleChange}
        />
      );
    }
    if (count > 6 && count % 6 !== 0) {
      return (
        <Pagination
          count={(count / 6)+1}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={2}
          size="large"
          variant="outlined"
          color="secondary"
          onChange={handleChange}
        />
      );
    }
  };
  useEffect(()=>{
    const element = RenderPagination();
    setPagination(element);
  },[count])
  return (
    <Stack spacing={2} sx={{ padding: "15px" }}>
      {pagination}
    </Stack>
  );
};

export default PaginationBar;
