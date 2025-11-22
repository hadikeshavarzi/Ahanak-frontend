import { defineType, defineField } from "sanity";

// Utility function to generate taxonomies
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
        }),
      ],
    });

// Array of all taxonomies
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
];

// MUST be default export so index.ts can import taxonomies
export default taxonomies;
