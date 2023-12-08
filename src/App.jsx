import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { NavBar } from "./components/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import { CartProvider } from "./contexts/CartContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currencies/:id" element={<ItemDetailContainer />} />
          <Route path="/currencies/:categoryId" element={<ItemListContainer />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
