import ReactPlayer from "react-player";
import styles from "./Video.module.scss";
import { FC } from "react";

const video_url = "https://www.youtube.com/watch?v=e1hc3O213zg";

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
            youtube: {
              playerVars: {
                autoplay: 1,
                mute: 1,
                loop: 1,
              },
            },
          }}
        />
      </div>
    </section>
  );
};

export default Video;
