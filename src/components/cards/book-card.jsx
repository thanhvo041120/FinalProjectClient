import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import { changeVisibility } from "redux/slices/drawer.slice";

const BookCard = (_props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/user/detail/${_props.bookId}`);
    dispatch(changeVisibility(false))
  };
  return (
    <Card
      sx={{
        backgroundColor: "#E9E9E9",
        width: "80%",
        height: "600px",
      }}
    >
      <CardActionArea
        sx={{
          backgroundColor: "#E9E9E9",
          width: "100%",
        }}
        onClick={handleClick}
      >
        <CardMedia
          component="img"
          height="400px"
          sx={{ objectFit: "fill" }}
          image={_props.cardImg}
          alt="Book image"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {_props.cardName}
          </Typography>
          <Typography
            sx={{
              display: "-webkit-box",
              wordBreak: "break-all",
              textOverflow: "ellipsis",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: "#222930",
            }}
            variant="body2"
          >
            {_props.cardDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
