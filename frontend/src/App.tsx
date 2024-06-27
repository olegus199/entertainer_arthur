import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import MainLayout from "./MainLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsInitial } from "./state/isInitialLoadSlice";

function App() {
  const [loading, set_loading] = useState(true);
  const [loader_visible, set_loader_visible] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("here");
    dispatch(setIsInitial(false));
  }, []);

  function handle_loading() {
    set_loading(false);
  }

  function handle_loader_visible() {
    set_loader_visible(false);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={
              <MainPage
                loading={loading}
                loader_visible={loader_visible}
                handle_loading={handle_loading}
                handle_loader_visible={handle_loader_visible}
              />
            }
          />
          <Route
            path="agreement"
            element={<div style={{ marginTop: 200 }}>user agreement</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
