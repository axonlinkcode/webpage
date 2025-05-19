import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Services from "./components/services/Services";
import Products from "./components/products/Products";
import Team from "./components/team/Team";

const App = () => {
  return (
    <>
      <Nav />
      <div>
        <Home />
        <Services/>
        <Products />
        <Team />
      </div>
    </>
  );
};

export default App;
