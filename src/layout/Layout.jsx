import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "../routes";

const Layout = () => {
  return (
    <div>
      <Header />
      <Routes>
        {appRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default Layout;
