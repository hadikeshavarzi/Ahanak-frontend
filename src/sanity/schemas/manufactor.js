import { defineType, defineField } from "sanity";

export default defineType({
  name: "manufactor",
  title: "کارخانه",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "نام کارخانه",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "اسلاگ",
      options: { source: "title" },
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "لوگو شرکت",
    }),
    defineField({
      name: "picture",
      type: "image",
      title: "عکس کارخانه",
    }),
    defineField({
      name: "address",
      type: "text",
      title: "آدرس",
    }),
    defineField({
      name: "location",
      type: "string",
      title: "محل",
    }),
    defineField({
      name: "age",
      type: "string",
      title: "سال راه‌اندازی",
    }),
    defineField({
      name: "phonenos",
      type: "string",
      title: "شماره تماس",
    }),
    defineField({
      name: "google_map",
      type: "url",
      title: "آدرس گوگل مپ",
    }),
  ],
});
