// @ts-nocheck
"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function Home() {
  const params = useParams();
  const searchParams = useSearchParams();
  const contentsRef = useRef();

  const modify = (html: string) => {
    var parser = new DOMParser();
    var htmlDocument = parser.parseFromString(html, "text/html");
  
    const answer = htmlDocument.querySelector(".result_div");
    const anchorTags = htmlDocument.querySelectorAll("a");
  
    anchorTags.forEach((tag) => {
      let href = tag.getAttribute("href");
      if (href && href.includes("textbook-solutions")) {
        href = href.replace("textbook-solutions", "");
        href = `/book${href}`;
        tag.setAttribute("href", href);
      }
    });

    htmlDocument.querySelectorAll("img").forEach(function (img) {
      var src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        var absoluteUrl = new URL(src, `https://www.shaalaa.com/`).href;
        img.setAttribute("src", absoluteUrl);
      }
    });

    contentsRef.current.append(answer);
  };
  

  useEffect(() => {
    fetch(
      `https://www.shaalaa.com/search-textbook-solutions/${params.slug}?${searchParams.toString()}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then(modify)
      .catch((err) => console.log(err));
  }, []);
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
      <div className="m-6 px-4 space-y-6 books-page">
   
          <div ref={contentsRef} />
  
      </div>
  );
}
