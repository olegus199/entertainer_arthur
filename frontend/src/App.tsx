import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import About from "./Components/About";
import Advantages from "./Components/Advantages";
import Hero from "./Components/Hero";
import NavBar from "./Components/NavBar";
// import Video from "./Components/Video";
import PhotoSection from "./Components/PhotoSection";
import Contacts from "./Components/Contacts";
import Meeting from "./Components/Meeting";

function App() {
  const [loading, set_loading] = useState(true);
  const [loader_visible, set_loader_visible] = useState(true);

  const handle_loading = () => {
    setTimeout(() => {
      set_loading(false);
    }, 1300);
  };

  useEffect(() => {
    if (!loading) {
      set_loader_visible(false);
    }
  }, [loading]);
  return (
    <>
      {loader_visible && (
        <div className={styles.loader_container}>
          <div className={styles.loader}></div>
        </div>
      )}
      <div onLoad={handle_loading}>
        <NavBar />
        <Hero />
        <About />
        <Advantages />
        <PhotoSection />
        {/* <Video /> */}
        <Contacts />
        <Meeting />
      </div>
    </>
  );
}

export default App;
