import { ArticleMetaService, ArticleService } from "../services";
import { ArticleWatcher } from "../watchers";

export class ArticleMetaWorker {
  constructor(
    protected articleService: ArticleService,
    protected articleMetaService: ArticleMetaService,
    protected watcher: ArticleWatcher,
  ) {}

  public async start() {
    const articles = await this.articleService.list();

    const articlesMetas = articles.map((article) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...metas } = article;

      return metas;
    });

    await this.articleMetaService.init(articlesMetas);

    this.watcher.on("add", (id) => this.handleCreate(id));
    this.watcher.on("change", (id) => this.handleUpdate(id));
    this.watcher.on("unlink", (id) => this.handleDelete(id));
  }

  public async stop() {
    await this.articleMetaService.destroy();
  }

  private async handleCreate(id: string) {
    const article = await this.articleService.read(id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...metas } = article;

    this.articleMetaService.create(id, metas);
  }

  private async handleUpdate(id: string) {
    const article = await this.articleService.read(id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...metas } = article;

    this.articleMetaService.update(id, metas);
  }

  private async handleDelete(id: string) {
    this.articleMetaService.delete(id);
  }
}
