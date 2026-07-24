import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent1.module.css";

export type FrameComponent1Type = {
  className?: string;
  frame1173?: string;

  /** Style props */
  frameDivLeft?: CSSProperties["left"];
  frameDivHeight?: CSSProperties["height"];
  frameDivHeight1?: CSSProperties["height"];
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
  frame1173,
  frameDivLeft,
  frameDivHeight,
  frameDivHeight1,
}) => {
  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      left: frameDivLeft,
    };
  }, [frameDivLeft, frameDivHeight]);

  const frameDiv2Style: CSSProperties = useMemo(() => {
    return {};
  }, [frameDivHeight1]);

  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <img
        className={styles.frameChild}
        loading="lazy"
        alt=""
        src={frame1173}
      />
      <div className={styles.sportsTrackSuitsParent} style={frameDiv1Style}>
        <h3 className={styles.sportsTrack}>{`02. SPORTS & TRACK SUITS`}</h3>
        <div className="card-footer">
          <div className={styles.highPerformanceSportswearDe}>
            High-performance sportswear designed for comfort, flexibility, and
            active school life.
          </div>
          <div className="card-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
