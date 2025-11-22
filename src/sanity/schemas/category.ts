import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "دسته‌بندی محصول",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "عنوان دسته",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "اسلاگ",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "h1",
      title: "تگ H1",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "توضیح کوتاه",
      type: "text",
    }),

    defineField({
      name: "longDescription",
      title: "توضیح بلند",
      type: "blockContent",
    }),

    defineField({
      name: "image",
      title: "تصویر دسته",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "banner",
      title: "بنر دسته",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "minBuy",
      title: "حداقل خرید",
      type: "number",
    }),

    defineField({
      name: "maxBuy",
      title: "حداکثر خرید",
      type: "number",
    }),

    defineField({
      name: "phone",
      title: "شماره تماس",
      type: "string",
    }),

    defineField({
      name: "internalPhone",
      title: "کد داخلی",
      type: "string",
    }),

    defineField({
      name: "telegramMessage",
      title: "متن تلگرام",
      type: "text",
    }),

    defineField({
      name: "telegramChannel",
      title: "آیدی کانال تلگرام",
      type: "string",
    }),

    defineField({
      name: "enabledAttributes",
      title: "ویژگی‌های فعال",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "سایز", value: "size" },
          { title: "استاندارد", value: "standard" },
          { title: "حالت", value: "condition" },
          { title: "نوع", value: "style" },
          { title: "ابعاد", value: "dem" },
          { title: "طول", value: "length" },
          { title: "عرض", value: "width" },
          { title: "ضخامت", value: "thick" },
          { title: "اینچ", value: "perinch" },
          { title: "قطر بیرونی", value: "ghotr" },
          { title: "وزن", value: "weight" },
          { title: "محل تحویل", value: "deliveryPlace" },
        ],
      },
    }),

    defineField({
      name: "brands",
      title: "کارخانه‌ها",
      type: "array",
      of: [{ type: "reference", to: [{ type: "manufactor" }] }],
    }),

    // میانگین و بیشترین/کمترین قیمت‌ها
    defineField({
      name: "avgPrice",
      title: "میانگین قیمت",
      type: "string",
    }),
    defineField({
      name: "avgPriceYesterday",
      title: "میانگین قیمت (دیروز)",
      type: "string",
    }),
    defineField({
      name: "avgPriceLastWeek",
      title: "میانگین قیمت (هفته گذشته)",
      type: "string",
    }),
    defineField({
      name: "highPrice",
      title: "بیشترین قیمت",
      type: "string",
    }),
    defineField({
      name: "lowPrice",
      title: "کمترین قیمت",
      type: "string",
    }),
    defineField({
      name: "lowPriceToday",
      title: "کمترین قیمت (روز)",
      type: "string",
    }),

    defineField({
      name: "screenshot",
      title: "تصویر دسته‌بندی (اسکرین‌شات)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
