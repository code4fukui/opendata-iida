import { CSV } from "https://js.sabae.cc/CSV.js";

const urls = [
  "https://www.city.iida.lg.jp/uploaded/attachment/67233.csv",
  "https://www.city.iida.lg.jp/uploaded/attachment/67211.csv",
];

for (const url of urls) {
  const data = await CSV.fetchJSON(url);
  const fn = url.substring(url.lastIndexOf("/") + 1);
  await Deno.writeTextFile(fn, CSV.stringify(data));
}
