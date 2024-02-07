import "./App.scss";
import Hero from "./Components/Hero";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <div style={{ height: "100vh", width: "100vw" }}>some section</div>
    </>
  );
}

export default App;
