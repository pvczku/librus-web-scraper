import axios, { AxiosError } from "axios";

export default class Fetch {
  constructor() {}

  public async get(url: string): Promise<string | undefined> {
    return new Promise<string | undefined>(async (resolve, reject) => {
      try {
        const HTMLData = axios
          .get(url)
          .then((res) => res.data)
          .catch((err: AxiosError) => console.log(err));
        resolve(HTMLData);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
