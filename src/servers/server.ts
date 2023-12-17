import { Application, Router, json } from "express";

export class Server {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public config() {
    this.app.use(json());
  }

  public addRoute(path: string = "/", router: Router) {
    this.app.use(path, router);
  }

  public async init(port: number, cb: () => void) {
    this.app.listen(port, cb);
  }
}
