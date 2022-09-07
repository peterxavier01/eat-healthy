import { useEffect, useState } from "react";
import RecipeCard from "./Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Markup } from "interweave";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { BASE_URL } from "../utils/API";

const Recipes = () => {
  const [number, setNumber] = useState(30);
  const [diet, setDiet] = useState("vegetarian");
  const [mealType, setMealType] = useState("dessert");

  const options = {
    url: BASE_URL,
    params: {
      number: number,
      tags: `${diet},${mealType}`,
      apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
    },
  };

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };

  const handleMealChange = (event) => {
    setMealType(event.target.value);
  };

  const loadMore = () => {
    setNumber((prev) => prev + 10);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // const fetchRandomRecipes = () => {
  //   const res = axios.get(`${BASE_URL}/recipes/random`, options);
  //   return res;
  // };

  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    const recipeCheck = JSON.parse(localStorage.getItem("recipes"));

    if (recipeCheck) {
      setRecipes(recipeCheck);
    } else {
      const res = await axios.get(`${BASE_URL}/recipes/random`, options);

      localStorage.setItem("recipes", JSON.stringify(res));
      setRecipes(res);
      return res;
    }
  };

  // const { data, isLoading, isError } = useQuery(
  //   ["recipes", mealType, diet],
  //   () => fetchRandomRecipes(),
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  // if (isLoading) {
  //   return <h2>Fetching data</h2>;
  // }

  // if (isError) {
  //   return <h2>Error fetching data</h2>;
  // }

  return (
    <>
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "1em",
          allignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 120, width: { xs: "100%", sm: "fit-content" } }}
          size="small"
        >
          <InputLabel id="demo-select-small">Diet</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            label="Diet"
            value={diet}
            onChange={handleDietChange}
          >
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="ketogenic">Ketogenic</MenuItem>
            <MenuItem value="gluten free">Gluten Free</MenuItem>
            <MenuItem value="lacto-vegetarian">Lacto-Vegetarian</MenuItem>
            <MenuItem value="ovo-vegetarian">Ovo-Vegetarian</MenuItem>
            <MenuItem value="pescatarian">Pescetarian</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          sx={{ m: 1, minWidth: 120, width: { xs: "100%", sm: "fit-content" } }}
          size="small"
        >
          <InputLabel id="demo-select-small">Meal Type</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            label="Meal Type"
            value={mealType}
            onChange={handleMealChange}
          >
            <MenuItem value="dessert">dessert</MenuItem>
            <MenuItem value="main course">main course</MenuItem>
            <MenuItem value="snack">snack</MenuItem>
            <MenuItem value="bread">bread</MenuItem>
            <MenuItem value="drink">drink</MenuItem>
            <MenuItem value="appetizer">appetizer</MenuItem>
          </Select>
        </FormControl>
      </form>

      <Box
        component="div"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        {/* {data?.data?.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            content={<Markup content={truncate(recipe.summary, 100)} />}
          />
        ))} */}

        {recipes?.data?.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            content={<Markup content={truncate(recipe.summary, 100)} />}
          />
        ))}
      </Box>
    </>
  );
};

export default Recipes;
