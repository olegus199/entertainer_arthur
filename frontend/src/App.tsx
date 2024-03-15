import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import About from "./Components/About";
import Advantages from "./Components/Advantages";
import Hero from "./Components/Hero";
import NavBar from "./Components/NavBar";
// import Video from "./Components/Video";
import PhotoSection from "./Components/PhotoSection";
import Contacts from "./Components/Contacts";
import Meeting from "./Components/Meeting";
import Footer from "./Components/Footer";
import { SectionNames } from "./types";

interface SectionRefs {
  hero_ref: React.RefObject<HTMLDivElement>;
  about_ref: React.RefObject<HTMLDivElement>;
  gallery_ref: React.RefObject<HTMLDivElement>;
  contacts_ref: React.RefObject<HTMLDivElement>;
}

function App() {
  const [loading, set_loading] = useState(true);
  const [loader_visible, set_loader_visible] = useState(true);
  const refs: SectionRefs = {
    hero_ref: useRef(null),
    about_ref: useRef(null),
    gallery_ref: useRef(null),
    contacts_ref: useRef(null),
  };

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

  const handle_scroll_to_section = (section_name: SectionNames) => {
    switch (section_name) {
      case "hero":
        refs.hero_ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        refs.about_ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "gallery":
        refs.gallery_ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contacts":
        refs.contacts_ref.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  return (
    <>
      {loader_visible && (
        <div className={styles.loader_container}>
          <div className={styles.loader}></div>
        </div>
      )}
      <div onLoad={handle_loading}>
        <NavBar handle_scroll_to_section={handle_scroll_to_section} />
        <div ref={refs.hero_ref}>
          <Hero />
        </div>
        <div ref={refs.about_ref}>
          <About />
          <Advantages />
        </div>
        <div ref={refs.gallery_ref}>
          <PhotoSection />
        </div>
        {/* <Video /> */}
        <div ref={refs.contacts_ref}>
          <Contacts />
        </div>
        <Meeting />
        <Footer handle_scroll_to_section={handle_scroll_to_section} />
      </div>
    </>
  );
}

export default App;
