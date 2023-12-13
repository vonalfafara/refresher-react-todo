import routes from "./routes";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} element={route.element} exact />
        );
      })}
    </Routes>
  );
};

export default App;
