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

// Export each taxonomy individually
export const size = createTaxonomy("size", "سایز");
export const standard = createTaxonomy("standard", "استاندارد");
export const condition = createTaxonomy("condition", "حالت");
export const style = createTaxonomy("style", "نوع");
export const dem = createTaxonomy("dem", "ابعاد");
export const length = createTaxonomy("length", "طول");
export const width = createTaxonomy("width", "عرض");
export const thick = createTaxonomy("thick", "ضخامت");
export const perinch = createTaxonomy("perinch", "سایز به اینچ");
export const ghotr = createTaxonomy("ghotr", "قطر بیرونی");
export const weight = createTaxonomy("weight", "وزن");
export const deliveryPlace = createTaxonomy("deliveryPlace", "محل تحویل");

// ✅ MUST be array for spreading in schema
const taxonomies = [
    size,
    standard,
    condition,
    style,
    dem,
    length,
    width,
    thick,
    perinch,
    ghotr,
    weight,
    deliveryPlace,

];

export default taxonomies;
