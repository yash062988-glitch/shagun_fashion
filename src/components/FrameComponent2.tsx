import { FunctionComponent, type CSSProperties } from "react";
import styles from "./FrameComponent2.module.css";

export type FrameComponent2Type = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  className = "",
  property1 = "Default",
}) => {
  return (
    <main
      className={[styles.desktop1Inner, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.groupWrapper}>
        <footer className={styles.shagunFashionShagunFashionParent}>
          <div className={styles.groupChild} />
        </footer>
      </div>
    </main>
  );
};

export default FrameComponent2;
