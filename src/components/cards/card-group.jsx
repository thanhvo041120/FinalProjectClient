import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { BookCardComponent } from ".";
import { Box } from "@mui/system";
const GroupBookCard = ({books}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          marginTop: "10px",
          marginBottom: "20px",
          paddingTop: "15px",
          paddingLeft: "65px",
          paddingRight: "65px"
        }}
      >
        {books.map((item) => (
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            key={books.indexOf(item)}
            sx={{
              display: 'flex',
              justifyContent:'center',
              alignItems: 'center',
              padding: 0,
              width:"100%",
            }}
          >
            <BookCardComponent
              bookId={item.id}
              cardName={item.name}
              cardDescription={item.description}
              cardImg={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default GroupBookCard;
