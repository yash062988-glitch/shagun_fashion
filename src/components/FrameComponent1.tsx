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
        <div
          className={styles.highPerformanceSportswearDeWrapper}
          style={frameDiv2Style}
        >
          <div className={styles.highPerformanceSportswearDe}>
            High-performance sportswear designed for comfort, flexibility, and
            active school life.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
