"use client";
import React, { useEffect, useRef } from "react";
import manipulateImage from "@/actions/manipulateImage";

const ImageManipulation: React.FC = () => {
  useEffect(() => {
    (async () => {
      window.open(
        await manipulateImage(
          "http://localhost:3000/proxy/images/_4:44375e7310924f94a7e7e0a928868c2e.png"
        ) as string
      );
    })();
  }, []);

  return <></>;
};

export default ImageManipulation;
