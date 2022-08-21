import { authRouter } from "./auth";
import { blogRouters } from "./blog";

const rootRouters = [authRouter];

export { rootRouters, blogRouters };
