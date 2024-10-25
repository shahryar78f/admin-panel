import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ProductsPage from "./pages/ProductsPage";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";

function App() {
  return (
    <>
      <ReactQueryClientProvider>
        <Routes>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
        <Toaster />
      </ReactQueryClientProvider>
    </>
  );
}

export default App;
