// @ts-nocheck
"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import manipulateImage from "@/actions/manipulateImage";

export default function Home() {
  const params = useParams();
  const contentsRef = useRef();

  const modify = (html: string) => {
    var parser = new DOMParser();
    var htmlDocument = parser.parseFromString(html, "text/html");

    const answer = htmlDocument.querySelector(".result_div");
    const anchorTags = htmlDocument.querySelectorAll("a");

    anchorTags.forEach((tag) => {
      let href = tag.getAttribute("href");
      if (href && href.includes("question-bank-solutions")) {
        href = href.replace("question-bank-solutions", "");
        href = `/solution${href}`;
        tag.setAttribute("href", href);
      }
    });


    htmlDocument.querySelectorAll("img").forEach(async function (img) {
      var src = img.getAttribute("src");
      const proxiedUrl = `${window.location.origin}/proxy/${src}`;
      img.setAttribute("src", await manipulateImage(proxiedUrl));
    });

    contentsRef.current.append(answer);
    window.MathJax.typeset();
  };

  useEffect(() => {
    fetch(`https://www.shaalaa.com/textbook-solutions/c/${params.slug}`, {
      method: "GET",
    })
      .then((res) => res.text())
      .then(modify)
      .catch((err) => console.log(err))
      
  }, []);

  return (
    <div className="m-6 px-4 space-y-6 exercise-page">
      <MathJax inline dynamic>
        <div ref={contentsRef} />
      </MathJax>
    </div>
  );
}
