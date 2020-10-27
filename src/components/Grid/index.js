import React from "react";

export const Flex = (props) => {
  const { children, style, column, ...rest } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: column ? "column" : "row",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
