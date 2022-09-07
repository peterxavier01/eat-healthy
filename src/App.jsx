import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

import { Layout, Recipes, RecipeDetails, Ingredients } from "./components";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Recipes />} />
              <Route path="/:id" element={<RecipeDetails />} />
              <Route path="/ingredients" element={<Ingredients />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
