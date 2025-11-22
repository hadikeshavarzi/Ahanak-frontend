import blockContent from "./blockContent";
import category from "./category";
import post from "./post";
import product from "./product";
import review from "./review";
import order from "./order";
import author from "./author";
import postCategory from "./postCategory";
import heroBanner from "./hero-banner";
import heroSlider from "./hero-slider";
import coupon from "./coupon";
import countdown from "./countdown";

// تکسونومی‌ها
import taxonomies from "./taxonomies";

// تولیدکننده‌ها (manufactor)
import manufactor from "./manufactor";

// خروجی نهایی
export const schemaTypes = [
  product,
  category,
  manufactor,
  ...taxonomies,

  post,
  postCategory,
  author,
  review,
  order,

  heroBanner,
  heroSlider,
  coupon,
  countdown,

  blockContent,
];

export default schemaTypes;
