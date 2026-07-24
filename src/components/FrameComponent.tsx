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
            <div className="card-footer">
              <div className={styles.smartDurableUniforms}>
                Smart, durable uniforms crafted to build confidence, identity, and
                excellence in every student.
              </div>
              <div className="card-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .7-.4 1.3-1 1.7L22 13a2 2 0 0 1-1 3H3a2 2 0 0 1-1-3l9-7.3c-.6-.4-1-1-1-1.7a2 2 0 0 1 2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
