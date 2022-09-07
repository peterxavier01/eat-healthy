import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const RecipeCard = ({ title, image, content, id }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/${id}`}>
        <CardMedia component="img" height="194" image={image} alt="recipe" />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
