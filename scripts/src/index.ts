import Fetch from "./scraper/fetcher";
import Cacher from "./scraper/cacher";

const fetcher = new Fetch();
const cacher = new Cacher();

async function test(url = "https://synergia.librus.pl") {
  if (url.search("https://") != -1 || url.search("http://") != -1) {
    const path = cacher.generateName(url);
    if (cacher.exists(path)) {
      console.log("istnieje");
      console.log(await cacher.read(path));
    } else {
      console.log("nie istnieje, pobieram");
      const data = await fetcher.get(url);
      console.log("data", data);
      if (data) {
        console.log("zapisuje");
        await cacher.save(path, data);
        console.log("wypisuje");
        console.log(await cacher.read(path));
      }
    }
  } else {
    console.log("bad url");
    return;
  }
}
test();
