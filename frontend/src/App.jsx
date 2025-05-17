import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Services from "./components/services/Services";
const App = () => {
  return (
    <>
      <Nav />
      <div>
        <Home />
        <Services/>
      </div>
    </>
  );
};

export default App;
