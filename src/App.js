import { Login, Register, Cart, ProductList, Home, Product } from "./pages";
import { Routes, Route } from "react-router-dom";
import Success from "./pages/Success";
import { ThemeProvider } from "styled-components";
import { DarkTheme, lightTheme } from "./Themes";
// import { Navbar } from "./components";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Update from "./pages/Update";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <ThemeProvider theme={lightTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={user ? <Profile /> : <Home />} />
        <Route path="/update" element={user ? <Update /> : <Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
