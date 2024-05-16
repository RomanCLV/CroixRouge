export async function searchLoader ({params}) {

    const search = params.search;
    let city = "";
    let text = "";
    let categories = [];
    let sizes = [];
    let genders = [];
    let state = 1;
    let minimumPrice = 0;
    let maximumPrice = 10000;
    let limit = 20;

    if (search) {
        const searchTags = search.split("&");
        for (const searchTag of searchTags) {
            const tmp = searchTag.split("=");
            const key = tmp[0];
            const value = tmp[1];

            if (key === "city") {
                city = value;
            }
            if (key === "text") {
                text = value;
            }
            if (key === "categories") {
                categories = value.split("|");
            }
            if (key === "sizes") {
                sizes = value.split("|");
            }
            if (key === "genders") {
                genders = value.split("|");
            }
            if (key === "state") {
                state = parseInt(value) || 1;
                if (state < 1) {
                    state = 1;
                }
                else if (state > 5) {
                    state = 5;
                }
            }
            if (key === "minimumPrice") {
                minimumPrice = parseInt(value) || 0;
                if (minimumPrice < 0) {
                    minimumPrice = 0;
                }
                else if (minimumPrice > 9999) {
                    minimumPrice = 9999;
                }
            }
            if (key === "maximumPrice") {
                maximumPrice = parseInt(value) || 10000;
                if (maximumPrice < 1) {
                    maximumPrice = 1;
                }
                else if (maximumPrice > 10000) {
                    maximumPrice = 10000;
                }
            }
            if (key === "limit") {
                limit = value;
            }
        }
    }

    return {
        city: city,
        text: text,
        categories: categories,
        sizes: sizes,
        genders: genders,
        state: state,
        minimumPrice: minimumPrice,
        maximumPrice: maximumPrice,
        limit: limit
    };
}
