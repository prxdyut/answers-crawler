// @ts-nocheck
"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";

export default function Home() {
  const params = useParams();
  const contentsRef = useRef();

  const modify = (html: string) => {
    var parser = new DOMParser();
    var htmlDocument = parser.parseFromString(html, "text/html");
  
    const content = htmlDocument.querySelector(".block");
    const anchorTags = htmlDocument.querySelectorAll("a");
  
    anchorTags.forEach((tag) => {
      let href = tag.getAttribute("href");
      if (href && href.includes("/textbook-solutions/c/")) {
        href = href.replace("/textbook-solutions/c/", "");
        href = `/exercise/${href}`;
        tag.setAttribute("href", href);
      }
    });

    htmlDocument.querySelectorAll("img").forEach(function (img) {
      var src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        var absoluteUrl = new URL(src, `https://www.shaalaa.com/`).href;
        img.setAttribute("src", absoluteUrl);
        img.setAttribute("style", "");
      }
    });

    contentsRef.current.append(content);
  };
  

  useEffect(() => {
    fetch(
      `https://www.shaalaa.com/textbook-solutions/${params.slug}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then(modify)
      .catch((err) => console.log(err));
  }, []);
  const config = {
    loader: { load: ["input/asciimath", "tex2chtml"] },
  };

  return (
      <div className="m-6 px-4 space-y-6 book-page">
       
          <div ref={contentsRef} />
       
      </div>
  );
}
