import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "محصول",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "نام محصول",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "اسلاگ",
      type: "slug",
      options: {
        source: "name",
        slugify: (input) =>
            input
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, ""),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "توضیح کوتاه",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "توضیح کامل",
      type: "blockContent",
    }),

    defineField({
      name: "category",
      title: "دسته‌بندی اصلی",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "manufactor",
      title: "کارخانه تولیدکننده",
      type: "reference",
      to: [{ type: "manufactor" }],
    }),

    defineField({
      name: "price",
      title: "قیمت",
      type: "number",
    }),

    defineField({
      name: "discountedPrice",
      title: "قیمت پس از تخفیف",
      type: "number",
    }),

    defineField({
      name: "status",
      title: "موجودی",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "publishedAt",
      title: "تاریخ انتشار",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    // -------------------------
    // تصاویر
    // -------------------------
    defineField({
      name: "thumbnails",
      title: "تصاویر اصلی",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "تصویر", options: { hotspot: true } },
            { name: "color", type: "string", title: "رنگ" },
          ],
        },
      ],
    }),

    defineField({
      name: "previewImages",
      title: "گالری تصاویر",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "تصویر", options: { hotspot: true } },
            { name: "color", type: "string", title: "رنگ" },
          ],
        },
      ],
    }),

    // -------------------------
    // ویژگی‌ها بدون grid
    // -------------------------
    {
      name: "attributes",
      title: "ویژگی‌های محصول",
      type: "object",
      fields: [
        { name: "size", title: "سایز", type: "array", of: [{ type: "reference", to: [{ type: "size" }] }] },
        { name: "standard", title: "استاندارد", type: "array", of: [{ type: "reference", to: [{ type: "standard" }] }] },
        { name: "condition", title: "حالت", type: "array", of: [{ type: "reference", to: [{ type: "condition" }] }] },
        { name: "thick", title: "ضخامت", type: "array", of: [{ type: "reference", to: [{ type: "thick" }] }] },
        { name: "length", title: "طول", type: "array", of: [{ type: "reference", to: [{ type: "length" }] }] },
        { name: "width", title: "عرض", type: "array", of: [{ type: "reference", to: [{ type: "width" }] }] },
        // ❌ grid حذف شد
        { name: "perinch", title: "سایز اینچ", type: "array", of: [{ type: "reference", to: [{ type: "perinch" }] }] },
        { name: "weight", title: "وزن", type: "array", of: [{ type: "reference", to: [{ type: "weight" }] }] },
        { name: "deliveryPlace", title: "محل تحویل", type: "array", of: [{ type: "reference", to: [{ type: "deliveryPlace" }] }] },
      ],
    },

    defineField({
      name: "additionalInformation",
      title: "اطلاعات اضافه",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "نام" },
            { name: "description", type: "string", title: "توضیحات" },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "thumbnails.0.image",
      subtitle: "category.title",
    },
  },
});
