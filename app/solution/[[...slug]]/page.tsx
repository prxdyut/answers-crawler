// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { revalidatePath } from "next/cache";
import manipulateImage from "@/actions/manipulateImage";

export default function Home() {
  const params = useParams();
  const questionRef = useRef();
  const answerRef = useRef();
  const [data, setData] = useState("");

  const modify = (html: string) => {
    var parser = new DOMParser();
    var htmlDocument = parser.parseFromString(html, "text/html");

    htmlDocument.querySelectorAll("img").forEach(async function (img) {
      var src = img.getAttribute("src");
      const proxiedUrl = `${window.location.origin}/proxy/${src}`;
      img.setAttribute("src", await manipulateImage(proxiedUrl));
    });

    const question = htmlDocument.querySelector(
      ".qbq_text.qbq_text_question .html_text"
    );
    const answer = htmlDocument.querySelector(
      ".qbq_text.qbq_text_solution #answer1"
    );
    questionRef.current.append(question);
    answerRef.current.append(answer);

    window.MathJax.typeset();
  };

  useEffect(() => {
    fetch(
      `https://www.shaalaa.com/question-bank-solutions/${params.slug.join(
        "/"
      )}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then(modify)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="m-6 px-4 space-y-6">
        <div>
          <p className=" text-xl font-semibold">Question:</p>
          <MathJax inline dynamic>
            <div id="questionContainer" ref={questionRef} />
          </MathJax>
        </div>
        <div>
          <p className=" text-xl font-semibold">Solution:</p>
          <MathJax inline dynamic>
            <div id="answerContainer" ref={answerRef} />
          </MathJax>
        </div>
      </div>
    </div>
  );
}
