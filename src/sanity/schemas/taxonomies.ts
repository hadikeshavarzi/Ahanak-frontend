import { defineType, defineField } from "sanity";

// Utility function to create a taxonomy schema
const createTaxonomy = (name: string, title: string) =>
    defineType({
      name,
      title,
      type: "document",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "عنوان",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "slug",
          type: "slug",
          title: "اسلاگ",
          options: {
            source: "title",
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: { title: "title" },
      },
    });

// All taxonomies including "grid"
const taxonomies = [
  createTaxonomy("size", "سایز"),
  createTaxonomy("standard", "استاندارد"),
  createTaxonomy("condition", "حالت"),
  createTaxonomy("style", "نوع"),
  createTaxonomy("dem", "ابعاد"),
  createTaxonomy("length", "طول"),
  createTaxonomy("width", "عرض"),
  createTaxonomy("thick", "ضخامت"),
  createTaxonomy("perinch", "سایز به اینچ"),
  createTaxonomy("ghotr", "قطر بیرونی"),
  createTaxonomy("weight", "وزن"),
  createTaxonomy("deliveryPlace", "محل تحویل"),
  createTaxonomy("grid", "گرید"), // 🔥 اضافه شد
];

// MUST be default export for schema registration
export default taxonomies;
