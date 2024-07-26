"use client"
import React from "react";

const ScrollView = ({ children, style }) => {
  return (
    <div className="scroll-view" style={style}>
      {children}
    </div>
  );
};

export default ScrollView;
