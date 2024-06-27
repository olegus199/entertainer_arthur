import { FC } from "react";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
