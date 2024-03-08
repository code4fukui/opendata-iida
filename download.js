import { CSV } from "https://js.sabae.cc/CSV.js";
import jismesh from "https://code4fukui.github.io/jismesh-es/index.js";

const dataset = [
  {
    url: "https://www.city.iida.lg.jp/uploaded/attachment/67233.csv",
    color: "red",
  },
  {
    url:  "https://www.city.iida.lg.jp/uploaded/attachment/67211.csv",
    color: "green",
  },
];

const list = [];
for (const d of dataset) {
  const url = d.url;
  const data = await CSV.fetchJSON(url);
  const fn = url.substring(url.lastIndexOf("/") + 1);
  await Deno.writeTextFile(fn, CSV.stringify(data));

  const color = d.color;
  data.forEach(i => {
    i.color = color;
    if (i.緯度 && i.経度) {
      i.jismesh3 = jismesh.toMeshCode(i.緯度, i.経度, 3);
    }
    list.push(i);
  });
}
await Deno.writeTextFile("iida.csv", CSV.stringify(list));
