import { FunctionComponent, type CSSProperties } from "react";
import FrameComponent from "./FrameComponent";
import FrameComponent1 from "./FrameComponent1";
import styles from "./Component1.module.css";

export type Component1Type = {
  className?: string;
  frame1172Frame1206?: string;
  frame1181Frame1206?: string;
  frame1172DivHeight?: CSSProperties["height"];
  frame1181DivHeight?: CSSProperties["height"];

  /** Variant props */
  property1?: string;
};

const Component1: FunctionComponent<Component1Type> = ({
  className = "",
  property1 = "Frame 1208",
  frame1172Frame1206,
  frame1181Frame1206,
  frame1172DivHeight,
  frame1181DivHeight,
}) => {
  return (
    <section
      className={[styles.component3, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.frameParent}>
        <FrameComponent
          frame1206={frame1172Frame1206}
          frameDivHeight={frame1172DivHeight}
        />
        <FrameComponent1 frame1173="/Frame-1173@2x.png" />
        <div className={styles.frameGroup}>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/Frame-11731@2x.png"
          />
          <div className={styles.winterCollectionParent}>
            <h3 className={styles.winterCollection}>
              03. WINTER COLLECTION
              <br />
            </h3>
            <div className="card-footer">
              <div className={styles.premiumSweatersJackets}>
                Premium sweaters, jackets, and winter wear that provide warmth
                without compromising style.
              </div>
              <div className="card-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="1" />
                  <path d="M12 5v17" />
                  <path d="M9 10c2-1 4-1 6 0" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <img className={styles.frameItem} alt="" src="/Frame-11732@2x.png" />
          <div className={styles.customHouseTShirtsParent}>
            <h3 className={styles.customHouseTShirts}>
              04. CUSTOM HOUSE T-SHIRTS
            </h3>
            <div className="card-footer">
              <div className={styles.uniqueHouseWiseTShirts}>
                Unique house-wise T-shirts tailored with custom colours, logos,
                and school branding.
              </div>
              <div className="card-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .7-.4 1.3-1 1.7L22 13a2 2 0 0 1-1 3H3a2 2 0 0 1-1-3l9-7.3c-.6-.4-1-1-1-1.7a2 2 0 0 1 2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameDiv}>
          <img className={styles.frameInner} alt="" src="/Frame-11733@2x.png" />
          <div className={styles.printingEmbroideryParent}>
            <h3
              className={styles.printingEmbroidery}
            >{`05. PRINTING & EMBROIDERY`}</h3>
            <div className="card-footer">
              <div className={styles.precisionPrintingAnd}>
                Precision printing and premium embroidery solutions that bring
                your school identity to life.
              </div>
              <div className="card-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameParent2}>
          <img className={styles.frameIcon} alt="" src="/Frame-11734@2x.png" />
          <div className={styles.manufacturingExcellenceParent}>
            <h3 className={styles.manufacturingExcellence}>
              06. MANUFACTURING EXCELLENCE
            </h3>
            <div className="card-footer">
              <div className={styles.stateOfTheArtCraftsmanship}>
                State-of-the-art craftsmanship, quality fabrics, and expert
                production for superior uniforms.
              </div>
              <div className="card-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="9.8" y1="8.2" x2="20" y2="18.4" />
                  <line x1="9.8" y1="15.8" x2="20" y2="5.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <FrameComponent
          frame1206={frame1181Frame1206}
          frameDivHeight={frame1181DivHeight}
        />
        <FrameComponent1
          frame1173="/Frame-1173@2x.png"
          frameDivLeft="20px"
          frameDivHeight="unset"
          frameDivHeight1="unset"
        />
        <div className={styles.frameParent3}>
          <img
            className={styles.frameChild2}
            alt=""
            src="/Frame-11731@2x.png"
          />
          <div className={styles.winterCollectionGroup}>
            <h3 className={styles.winterCollection2}>
              03. WINTER COLLECTION
              <br />
            </h3>
            <div className="card-footer">
              <div className={styles.premiumSweatersJackets2}>
                Premium sweaters, jackets, and winter wear that provide warmth
                without compromising style.
              </div>
              <div className="card-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="1" />
                  <path d="M12 5v17" />
                  <path d="M9 10c2-1 4-1 6 0" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Component1;
