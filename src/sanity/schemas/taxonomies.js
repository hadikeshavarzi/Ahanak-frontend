import { defineType, defineField } from "sanity";

const createTaxonomy = (name, title) =>
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
      }),
    ],
  });

export const taxonomies = [
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
];
