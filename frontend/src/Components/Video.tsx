import ReactPlayer from "react-player";
import styles from "./Video.module.scss";
import { FC } from "react";

const video_url = "https://www.youtube.com/watch?v=xXrfFT7PPKc";

const Video: FC = () => {
  return (
    <section className={styles.video_section}>
      <div className={styles.video_wrapper}>
        <ReactPlayer
          className={styles.react_player}
          url={video_url}
          controls
          config={{
            youtube: {},
          }}
        />
      </div>
    </section>
  );
};

export default Video;
