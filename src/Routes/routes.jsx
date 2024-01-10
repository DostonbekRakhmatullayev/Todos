import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";

import { Registers } from "../pages/Registers/registers";

import Public from "./public";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registers />} />
        <Route path="/" element={<Public />}></Route>
      </Routes>
    </>
  );
};
