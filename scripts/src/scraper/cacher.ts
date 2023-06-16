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
      try {
        fs.writeFileSync(url, data);
        res(true);
      } catch (err) {
        rej(err);
      }
    });
  }

  read(url: string) {
    return new Promise<string | undefined>(async (res, rej) => {
      try {
        fs.readFile(url, (err, data) => {
          if (err) rej(err);
          res(data.toString());
        });
      } catch (err) {
        rej(err);
      }
    });
  }

  generateName(url: string): string {
    let newUrl = "";
    if (url.search("://") != -1) {
      if (url.split("/").length > 1) {
        const urlParts = url.split("://")[1]!.split("/");
        for (let i = 0; i < urlParts.length; i++) {
          if (i > 0) {
            newUrl += "_";
          }
          newUrl += urlParts[i];
        }
      } else {
        newUrl = url.split("://")[1]!;
      }
    } else {
      newUrl = url;
    }
    newUrl = ".cache/" + newUrl + ".html";
    console.log(newUrl);
    return newUrl;
  }
}