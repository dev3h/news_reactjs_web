import fs from "fs";
import fetch from "node-fetch";

async function main() {
  const res = await fetch("https://news-api-ko52.onrender.com/api/v1/sitemap.xml");
  const xml = await res.text();
  fs.writeFileSync("./public/sitemap.xml", xml);
  console.log("Sitemap generated!");
}

main();
