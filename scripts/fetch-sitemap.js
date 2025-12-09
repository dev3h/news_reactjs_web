import fs from "fs";
import axios from "axios";

async function main() {
  const res = await axios.get("https://news-api-ko52.onrender.com/api/v1/sitemap.xml", {
    responseType: "text"
  });
  fs.writeFileSync("./public/sitemap.xml", res.data);
  console.log("Sitemap generated!");
}

main();