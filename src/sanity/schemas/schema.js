import { taxonomies } from "./taxonomies";
import product from "./product";
import category from "./category";
import manufactor from "./manufactor";

export const schema = {
  types: [
    ...taxonomies,
    product,
    category,
    manufactor,
  ],
};
