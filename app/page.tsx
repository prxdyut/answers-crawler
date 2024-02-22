export default function Home() {
  fetch("https://youtube.com", {
    method: "GET",
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return <div></div>;
}
