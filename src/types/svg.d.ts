declare module "*.svg" {
  import React, { SVGProps, CSSProperties } from "react";

  const content: React.FC<
    SVGProps<SVGElement> & {
      primarycolor?: CSSProperties["color"];
      secondarycolor?: CSSProperties["color"];
    }
  >;

  export default content;
}
