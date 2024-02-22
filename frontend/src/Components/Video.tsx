import ReactPlayer from "react-player";
import styles from "./Video.module.scss";
import { FC } from "react";
import pl_ph1 from "../assets/photo_placeholders/ph1.jpg";
import pl_ph2 from "../assets/photo_placeholders/ph2.jpg";
import pl_ph3 from "../assets/photo_placeholders/ph3.jpg";
import pl_ph4 from "../assets/photo_placeholders/ph4.jpg";
import pl_ph5 from "../assets/photo_placeholders/ph5.jpg";
import pl_ph6 from "../assets/photo_placeholders/ph6.jpg";
import pl_ph7 from "../assets/photo_placeholders/ph7.jpg";
import pl_ph8 from "../assets/photo_placeholders/ph8.jpg";
import pl_ph9 from "../assets/photo_placeholders/ph9.jpg";
import pl_ph10 from "../assets/photo_placeholders/ph10.jpg";
import pl_ph11 from "../assets/photo_placeholders/ph11.jpg";
import pl_ph12 from "../assets/photo_placeholders/ph12.jpg";
import pl_ph13 from "../assets/photo_placeholders/ph13.jpg";
import pl_ph14 from "../assets/photo_placeholders/ph14.jpg";
import pl_ph15 from "../assets/photo_placeholders/ph15.jpg";
import pl_ph16 from "../assets/photo_placeholders/ph16.jpg";
import main_ph1 from "../assets/photo_gallery/ph1.jpg";
import main_ph2 from "../assets/photo_gallery/ph2.jpg";
import main_ph3 from "../assets/photo_gallery/ph3.jpg";
import main_ph4 from "../assets/photo_gallery/ph4.jpg";
import main_ph5 from "../assets/photo_gallery/ph5.jpg";
import main_ph6 from "../assets/photo_gallery/ph6.jpg";
import main_ph7 from "../assets/photo_gallery/ph7.jpg";
import main_ph8 from "../assets/photo_gallery/ph8.jpg";
import main_ph9 from "../assets/photo_gallery/ph9.jpg";
import main_ph10 from "../assets//photo_galleryph10.jpg";
import main_ph11 from "../assets//photo_galleryph11.jpg";
import main_ph12 from "../assets//photo_galleryph12.jpg";
import main_ph13 from "../assets//photo_galleryph13.jpg";
import main_ph14 from "../assets//photo_galleryph14.jpg";
import main_ph15 from "../assets//photo_galleryph15.jpg";
import main_ph16 from "../assets//photo_galleryph16.jpg";

interface Photos {
  main: string;
  placeholder: string;
}

const photos: Photos[] = [
  {
    main: main_ph1,
    placeholder: pl_ph1,
  },
  {
    main: main_ph2,
    placeholder: pl_ph2,
  },
  {
    main: main_ph3,
    placeholder: pl_ph3,
  },
  {
    main: main_ph4,
    placeholder: pl_ph4,
  },
  {
    main: main_ph5,
    placeholder: pl_ph5,
  },
  {
    main: main_ph6,
    placeholder: pl_ph6,
  },
  {
    main: main_ph7,
    placeholder: pl_ph7,
  },
  {
    main: main_ph8,
    placeholder: pl_ph8,
  },
  {
    main: main_ph9,
    placeholder: pl_ph9,
  },
  {
    main: main_ph10,
    placeholder: pl_ph10,
  },
  {
    main: main_ph11,
    placeholder: pl_ph11,
  },
  {
    main: main_ph12,
    placeholder: pl_ph12,
  },
  {
    main: main_ph13,
    placeholder: pl_ph13,
  },
  {
    main: main_ph14,
    placeholder: pl_ph14,
  },
  {
    main: main_ph15,
    placeholder: pl_ph15,
  },
  {
    main: main_ph16,
    placeholder: pl_ph16,
  },
];

const Video: FC = () => {
  return (
    <section className={styles.video_section}>
      <div className={styles.video_wrapper}>
        <ReactPlayer url="https://www.youtube.com/watch?v=e1hc3O213zg" />
      </div>
    </section>
  );
};

export default Video;
