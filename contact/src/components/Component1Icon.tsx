import { FunctionComponent, type CSSProperties } from "react";
import styles from "./Component1Icon.module.css";

export type Component1IconType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const Component1Icon: FunctionComponent<Component1IconType> = ({
  className = "",
  property1 = "Frame 13",
}) => {
  return (
    <img
      className={[styles.component1Icon, className].join(" ")}
      alt=""
      src="/contact/Component-1@2x.png"
      data-property1={property1}
    />
  );
};

export default Component1Icon;
