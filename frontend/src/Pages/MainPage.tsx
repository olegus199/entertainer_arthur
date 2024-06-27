import { FC, useEffect, useRef } from "react";
import About from "../Components/About";
import Advantages from "../Components/Advantages";
import Hero from "../Components/Hero";
import PhotoSection from "../Components/PhotoSection";
import Contacts from "../Components/Contacts";
import Meeting from "../Components/Meeting";
import Footer from "../Components/Footer";
import { SectionHeights, SectionRefs } from "../types";
import SpecialOffer from "../Components/SpecialOffer";
import Loader from "../Components/Loader";
import { useDispatch } from "react-redux";
import { setYOffset } from "../state/sectionYOffsetSlice";
import { setSectionHeights } from "../state/sectionHeightsSlice";

interface MainPageProps {
  loading: boolean;
  loader_visible: boolean;
  handle_loading: () => void;
  handle_loader_visible: () => void;
}

const MainPage: FC<MainPageProps> = ({
  loading,
  loader_visible,
  handle_loading,
  handle_loader_visible,
}) => {
  const refs: SectionRefs = {
    hero_ref: useRef(null),
    about_ref: useRef(null),
    gallery_ref: useRef(null),
    contacts_ref: useRef(null),
  };
  const dispatch = useDispatch();

  const handle_on_load = () => {
    setTimeout(() => {
      handle_loading();
    }, 1300);
  };

  function getHeights() {
    if (
      refs.about_ref.current !== null &&
      refs.contacts_ref.current !== null &&
      refs.gallery_ref.current !== null &&
      refs.hero_ref.current !== null
    ) {
      let about = refs.about_ref.current;
      let contacts = refs.contacts_ref.current;
      let gallery = refs.gallery_ref.current;
      let hero = refs.hero_ref.current;

      let heights: SectionHeights = {
        about: about.getBoundingClientRect().top,
        contacts: contacts.getBoundingClientRect().top,
        gallery: gallery.getBoundingClientRect().top,
        hero: hero.getBoundingClientRect().top,
      };

      dispatch(setSectionHeights(heights));
    }
  }

  useEffect(() => {
    getHeights();

    const handleScroll = () => {
      getHeights();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refs.about_ref, refs.contacts_ref, refs.gallery_ref, refs.hero_ref]);

  useEffect(() => {
    const handle_resize = () => {
      dispatch(setYOffset(window.innerWidth <= 1010 ? 50 : 80));
    };

    window.addEventListener("resize", handle_resize);

    return () => {
      window.removeEventListener("resize", handle_resize);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      handle_loader_visible();
    }
  }, [loading]);

  return (
    <>
      {loader_visible && <Loader />}
      <div onLoad={handle_on_load}>
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
        <SpecialOffer />
        <div ref={refs.contacts_ref}>
          <Contacts />
        </div>
        <Meeting />
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
