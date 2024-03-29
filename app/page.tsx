// @ts-nocheck
"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const contentRef = useRef();

  const modify = (html: string) => {
    var parser = new DOMParser();
    var htmlDocument = parser.parseFromString(html, "text/html");
    const anchorTags = htmlDocument.querySelectorAll("a");

    anchorTags.forEach((tag) => {
      let href = tag.getAttribute("href");
      if (href && href.includes("search-textbook-solutions")) {
        href = href.replace("search-textbook-solutions", "");
        href = `/books/${href}`;
        tag.setAttribute("href", href);
      }
    });
    htmlDocument.querySelectorAll("img").forEach(function (img) {
      var src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        var absoluteUrl = new URL(src, `https://www.shaalaa.com/`).href;
        img.setAttribute("src", absoluteUrl);
        img.setAttribute("style", "    filter: invert(1);");
      }
    });

    const content = htmlDocument.querySelector("#content .grid_col_left");
    contentRef.current.append(content);
  };

  useEffect(() => {
    fetch(
      "https://www.shaalaa.com/cu/maharashtra-state-board-12th-standard-board-exam-hsc-science-general_573",
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
    <div className="m-6 px-4 space-y-6 browse-page">
      <MathJax>
      <div ref={contentRef} /></MathJax>
    </div>
  );
}
