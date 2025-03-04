import React from "react";

// 擴充時轉 Intetface
export type IPropsOutsideLink = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const OutsideLink: React.FC<IPropsOutsideLink> = (props) => {
  const { target, rel, children, ...rest } = props;
  return (
    <a {...rest} target={target ?? "_blank"} rel={rel ?? "noopener noreferrer"}>
      {children ?? props.href}
    </a>
  );
};
