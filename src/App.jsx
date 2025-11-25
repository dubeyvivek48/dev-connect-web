import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginAndSignupPage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<LoginPage signup={true} />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
