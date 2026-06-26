import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
  frame1206?: string;

  /** Style props */
  frameDivHeight?: CSSProperties["height"];
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  frame1206,
  frameDivHeight,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      height: frameDivHeight,
    };
  }, [frameDivHeight]);

  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <img
        className={styles.frameChild}
        loading="lazy"
        alt=""
        src={frame1206}
      />
      <div className={styles.frameWrapper}>
        <div className={styles.frameContainer}>
          <div
            className={styles.premiumSchoolUniformsParent}
            style={frameDivStyle}
          >
            <h3 className={styles.premiumSchoolUniforms}>
              01. PREMIUM SCHOOL UNIFORMS
            </h3>
            <div className={styles.smartDurableUniforms}>
              Smart, durable uniforms crafted to build confidence, identity, and
              excellence in every student.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
