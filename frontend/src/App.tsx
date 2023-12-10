import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
