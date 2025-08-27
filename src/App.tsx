import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/katalog" element={<ProductCatalogPage />} />
        <Route path="/produk/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
