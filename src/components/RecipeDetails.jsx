import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Markup } from "interweave";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { grey } from "@mui/material/colors";

import { BASE_URL } from "../utils/API";

const options = {
  url: BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
  },
};

const RecipeDetails = () => {
  const { id } = useParams();

  // const [recipeDetails, setRecipeDetails] = useState({});

  // useEffect(() => {
  //   fetchRecipeInfoById();
  // }, []);

  const fetchRecipeInfoById = () => {
    const res = axios.get(
      `${BASE_URL}/recipes/${id}/information?includeNutrition=false`,
      options
    );
    return res;
  };

  // const fetchRecipeInfoById = async () => {
  //   const recipeDetailsCheck = JSON.parse(
  //     localStorage.getItem("recipeDetails")
  //   );

  //   if (recipeDetailsCheck) {
  //     setRecipeDetails(recipeDetailsCheck);
  //   } else {
  //     const res = await axios.get(
  //       `${BASE_URL}/recipes/${id}/information?includeNutrition=false`,
  //       options
  //     );

  //     localStorage.setItem("recipeDetails", JSON.stringify(res));
  //     setRecipeDetails(res);
  //     return res;
  //   }
  // };

  const { data, isLoading, isError } = useQuery(
    ["recipe info"],
    () => fetchRecipeInfoById(),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Fetching data</h2>;
  }

  if (isError) {
    return <h2>Error fetching data</h2>;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              image={data?.data?.image}
              component="img"
              height="400"
              alt="recipe"
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h3" gutterBottom>
            {data?.data?.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <Box
              component="span"
              sx={{
                backgroundColor: "#068488",
                color: "#fff",
                p: 1.2,
                borderRadius: "100px",
                border: "none",
              }}
            >
              {data?.data?.readyInMinutes} mins
            </Box>
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            color="textSecondary"
            sx={{ mb: 3, lineHeight: "30px" }}
          >
            {<Markup content={data?.data?.summary} />}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Steps for Preparing {data?.data?.title}
          </Typography>
          {data?.data?.analyzedInstructions?.[0]?.steps?.map((step) => (
            <Box
              key={step.number}
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
                alignItems: "start",
              }}
            >
              <Box
                component="div"
                sx={{
                  p: 2,
                  border: `1px solid ${grey[500]}`,
                  borderRadius: "100px",
                  color: grey[700],
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {step.number}
              </Box>
              <Typography
                key={step.number}
                variant="subtitle1"
                component="p"
                gutterBottom
              >
                {<Markup content={step.step} />}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      <Typography component="h4" variant="h4" sx={{ mt: 5, mb: 2 }}>
        List of All Ingredients Required
      </Typography>
      <Stack
        direction="row"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 1.2,
        }}
      >
        {data?.data?.extendedIngredients?.map((ingredient) => (
          <Box key={ingredient.id + Math.random()}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="p" color="">
                  {ingredient.nameClean.toUpperCase()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {ingredient.aisle}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default RecipeDetails;
