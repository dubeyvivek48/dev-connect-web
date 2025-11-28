import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginAndSignupPage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import FeedPage from "./components/FeedPage";
import { ToastProvider } from "./context/ToastContainer";
import ProfilePage from "./components/ProfilePage";
import ConnectionsPage from "./components/ConnectionsPage";
import ConnectionRequestPage from "./components/ConnectionRequestPage";

function App() {
  return (
    <Provider store={appStore}>
      <ToastProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route
                path="/signup"
                element={<LoginPage signup={true} />}
              ></Route>
              <Route path="/" element={<FeedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route path="/requests" element={<ConnectionRequestPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}

export default App;
