import algoliasearch from "algoliasearch";
import { load } from "cheerio";

const appID = process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID ?? "";
const apiKEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? "";
const INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX ?? "products";

// بررسی credentials
const isAlgoliaEnabled = Boolean(appID && apiKEY);

let client: any = null;
let index: any = null;

if (isAlgoliaEnabled) {
    try {
        client = algoliasearch(appID, apiKEY);
        index = client.initIndex(INDEX);
        console.log("✅ Algolia initialized successfully");
    } catch (error) {
        console.error("❌ Algolia initialization failed:", error);
    }
}

export const structuredAlgoliaHtmlData = async ({
                                                    pageUrl = "",
                                                    htmlString = "",
                                                    title = "",
                                                    type = "",
                                                    imageURL = "",
                                                    price = 0,
                                                    discountedPrice = 0,
                                                    reviews = 0,
                                                    category = "",
                                                    colors = [],
                                                    sizes = [],
                                                    _id = "",
                                                    tags = [],
                                                    description = [],
                                                    thumbnails = [],
                                                    previewImages = [],
                                                    additionalInformation = {},
                                                    customAttributes = {},
                                                    status = true,
                                                    offers = [],
                                                }) => {
    if (!isAlgoliaEnabled || !index) {
        console.warn("⚠️ Algolia is not configured - skipping indexing");
        return null;
    }

    try {
        const c$ = load(htmlString).text();
        const data = {
            objectID: pageUrl,
            name: title,
            url: pageUrl,
            shortDescription: c$.slice(0, 7000),
            type: type,
            imageURL: imageURL,
            updatedAt: new Date().toISOString(),
            price: price,
            discountedPrice: discountedPrice,
            reviews: reviews,
            category: category,
            colors: colors,
            sizes: sizes,
            tags: tags,
            _id: _id,
            thumbnails: thumbnails,
            previewImages: previewImages,
            additionalInformation: additionalInformation,
            customAttributes: customAttributes,
            status: status,
            offers: offers,
            description: description,
        };

        await addToAlgolia(data);
        console.log("✅ Product indexed:", title);
        return data;
    } catch (error) {
        console.error("❌ Algolia indexing failed:", error);
        return null;
    }
};

async function addToAlgolia(record: any) {
    if (!isAlgoliaEnabled || !index) return;

    try {
        await index.saveObject(record, {
            autoGenerateObjectIDIfNotExist: true,
        });
    } catch (error) {
        console.error("❌ Error adding to Algolia:", error);
    }
}

export const updateIndex = async (data: any) => {
    if (!isAlgoliaEnabled || !index) return;

    try {
        await index.partialUpdateObject(data);
        console.log("✅ Index updated");
    } catch (error) {
        console.error("❌ Error updating index:", error);
    }
};