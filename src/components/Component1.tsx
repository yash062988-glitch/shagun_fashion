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
            <div className={styles.premiumSweatersJackets}>
              Premium sweaters, jackets, and winter wear that provide warmth
              without compromising style.
            </div>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <img className={styles.frameItem} alt="" src="/Frame-11732@2x.png" />
          <div className={styles.customHouseTShirtsParent}>
            <h3 className={styles.customHouseTShirts}>
              04. CUSTOM HOUSE T-SHIRTS
            </h3>
            <div className={styles.uniqueHouseWiseTShirts}>
              Unique house-wise T-shirts tailored with custom colours, logos,
              and school branding.
            </div>
          </div>
        </div>
        <div className={styles.frameDiv}>
          <img className={styles.frameInner} alt="" src="/Frame-11733@2x.png" />
          <div className={styles.printingEmbroideryParent}>
            <h3
              className={styles.printingEmbroidery}
            >{`05. PRINTING & EMBROIDERY`}</h3>
            <div className={styles.precisionPrintingAnd}>
              Precision printing and premium embroidery solutions that bring
              your school identity to life.
            </div>
          </div>
        </div>
        <div className={styles.frameParent2}>
          <img className={styles.frameIcon} alt="" src="/Frame-11734@2x.png" />
          <h3 className={styles.manufacturingExcellence}>
            06. MANUFACTURING EXCELLENCE
          </h3>
          <div className={styles.stateOfTheArtCraftsmanship}>
            State-of-the-art craftsmanship, quality fabrics, and expert
            production for superior uniforms.
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
            <div className={styles.premiumSweatersJackets2}>
              Premium sweaters, jackets, and winter wear that provide warmth
              without compromising style.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Component1;
