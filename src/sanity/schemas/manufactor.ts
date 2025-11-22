import { defineType, defineField } from "sanity";

export default defineType({
  name: "manufactor",
  title: "کارخانه",
  type: "document",
  fields: [
    // نام کارخانه
    defineField({
      name: "title",
      type: "string",
      title: "نام کارخانه",
      validation: (Rule) => Rule.required(),
    }),

    // اسلاگ
    defineField({
      name: "slug",
      type: "slug",
      title: "اسلاگ",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // لوگو
    defineField({
      name: "logo",
      type: "image",
      title: "لوگو شرکت",
      options: { hotspot: true },
    }),

    // عکس کارخانه
    defineField({
      name: "picture",
      type: "image",
      title: "عکس کارخانه",
      options: { hotspot: true },
    }),

    // آدرس
    defineField({
      name: "address",
      type: "text",
      title: "آدرس",
    }),

    // محل (Dropdown استاندارد مانند وردپرس تو)
    defineField({
      name: "location",
      type: "string",
      title: "محل کارخانه",
      options: {
        list: [
          { title: "یزد", value: "Yazd" },
          { title: "اصفهان", value: "Esfahan" },
          { title: "کردستان", value: "Kordestan" },
          { title: "البرز", value: "Alborz" },
          { title: "تهران", value: "Tehran" },
          { title: "خوزستان", value: "Khuzestan" },
          { title: "فارس", value: "Fars" },
          { title: "مازندران", value: "Mazandaran" },
          { title: "گلستان", value: "Golestan" },
          { title: "کرمان", value: "Kerman" },
          { title: "هرمزگان", value: "Hormozgan" },
          { title: "آذربایجان شرقی", value: "East Azarbaijan" },
          { title: "آذربایجان غربی", value: "West Azarbaijan" },
          { title: "کرمانشاه", value: "Kermanshah" },
          // بقیه استان‌ها هم اگر خواستی اضافه می‌کنم
        ],
      },
    }),

    // سال راه اندازی
    defineField({
      name: "age",
      type: "string",
      title: "سال راه‌اندازی",
    }),

    // شماره تماس
    defineField({
      name: "phonenos",
      type: "string",
      title: "شماره تماس",
    }),

    // لینک گوگل مپ
    defineField({
      name: "google_map",
      type: "url",
      title: "آدرس گوگل مپ",
      validation: (Rule) =>
          Rule.uri({
            scheme: ["http", "https"],
          }),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "logo",
      subtitle: "location",
    },
  },
});
