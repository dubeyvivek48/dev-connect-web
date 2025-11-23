import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndSignupPage from "./components/LoginAndSignupPage";
import LoginPage from "./components/LoginAndSignupPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<LoginPage signup={true} />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
