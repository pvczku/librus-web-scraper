import fs from "fs";

export default class Cacher {
  constructor() {
    fs.existsSync(".cache")
      ? console.log("cache exists")
      : fs.mkdirSync(".cache");
  }

  exists(url: string): boolean {
    return fs.existsSync(url);
  }

  save(url: string, data: string): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
      let newUrl = url;
      console.log(newUrl);
      if (url.search("://") != -1) {
        newUrl = url.split("://")[1]!;
      }
      if (newUrl.search("/") != -1) {
        newUrl = newUrl.split("/")[0]!;
      }
      newUrl = ".cache/" + newUrl + ".html";
      try {
        fs.writeFileSync(newUrl, data);
        res(true);
      } catch (err) {
        rej(err);
      }
    });
  }

  read(url: string) {
    return new Promise<string | undefined>(async (res, rej) => {
      let newUrl: string = url;
      console.log(newUrl);
      if (url.search("://") != -1) {
        newUrl = url.split("://")[1]!;
      }
      if (newUrl.search("/") != -1) {
        newUrl = newUrl.split("/")[0]!;
      }
      newUrl = ".cache/" + newUrl + ".html";
      try {
        fs.readFile(newUrl, (err, data) => {
          if (err) rej(err);
          res(JSON.stringify(data));
        });
      } catch (err) {
        rej(err);
      }
    });
  }
}
