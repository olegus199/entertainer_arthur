import ReactPlayer from "react-player";
import styles from "./Video.module.scss";
import { FC } from "react";

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
