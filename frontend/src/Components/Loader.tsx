import styles from "./Loader.module.scss";
import { FC } from "react";

const Lodaer: FC = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Lodaer;
