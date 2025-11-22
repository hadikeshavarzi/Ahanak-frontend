import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "دسته بندی محصول",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "نام دسته",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "اسلاگ",
      options: { source: "title" },
    }),

    defineField({
      name: "banner",
      type: "image",
      title: "بنر",
    }),

    defineField({
      name: "image",
      type: "image",
      title: "تصویر دسته",
    }),

    defineField({
      name: "h1",
      type: "string",
      title: "H1",
    }),

    defineField({
      name: "telegram_msg",
      type: "text",
      title: "متن تلگرام",
    }),

    defineField({
      name: "minbuy",
      type: "number",
      title: "حداقل خرید",
    }),

    defineField({
      name: "maxbuy",
      type: "number",
      title: "حداکثر خرید",
    }),

    defineField({
      name: "description",
      type: "text",
      title: "توضیح بلند",
    }),

    defineField({
      name: "catbrand",
      title: "کارخانه‌ها",
      type: "array",
      of: [{ type: "reference", to: [{ type: "manufactor" }] }],
    }),
  ],
});
