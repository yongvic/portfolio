"use client";

import React from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
};

export default ParallaxImage;
