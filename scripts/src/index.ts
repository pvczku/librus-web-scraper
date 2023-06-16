import Fetch from "./scraper/fetcher";
import Cacher from "./scraper/cacher";

const fetcher = new Fetch();
const cacher = new Cacher();

async function test(url = "https://synergia.librus.pl") {
  let newUrl = url;
  console.log(newUrl);
  if (url.search("://") != -1) {
    newUrl = url.split("://")[1]!;
  }
  if (newUrl.search("/") != -1) {
    newUrl = newUrl.split("/")[0]!;
  }
  newUrl = ".cache/" + newUrl + ".html";
  if (cacher.exists(newUrl)) {
    console.log("istnieje");
    console.log(await cacher.read(url));
  } else {
    console.log("nie istnieje, pobieram");
    const data = await fetcher.get(url);
    console.log("data", data);
    if (data) {
      console.log("zapisuje");
      await cacher.save(url, data);
      console.log("wypisuje");
      console.log(await cacher.read(url));
    }
  }
}

test();
