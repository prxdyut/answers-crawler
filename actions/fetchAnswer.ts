import { parse } from "node-html-parser";

export default async () => {
  const response = await fetch(
    "https://www.shaalaa.com/question-bank-solutions/in-the-triangle-pqr-pq2aqr2bpq-2a-qr-2b-the-midpoint-of-pr-is-m-find-the-following-vectors-in-terms-of-aa-and-bb-i-prpr-ii-pmpm-iii-qmqm-vectors-and-their-types_142507#ref=chapter&id=117586"
  );
  const data = await response.text();

  const document = parse(data);
  const answer = document.querySelectorAll("#answer1 > p");
  const answerFormatted = [...answer].map((a) => a.textContent);
  return answerFormatted;
};
