import ReactPlayer from "react-player";
import styles from "./Video.module.scss";
import { FC } from "react";
import video_url from "../assets/promo.mp4";

const Video: FC = () => {
  return (
    <section className={styles.video_section}>
      <div className={styles.video_wrapper}>
        <ReactPlayer
          className={styles.react_player}
          url={video_url}
          width="100%"
          height="100%"
          controls
          config={{
            file: {},
          }}
        />
      </div>
    </section>
  );
};

export default Video;
