export async function searchLoader ({params}) {

    const search = params.search;
    let text = "";
    let categories = [];
    let sizes = [];
    let genders = [];
    let vestingState = 1;
    let minimumPrice = 0;
    let maximumPrice = 10000;

    if (search) {
        const searchTags = search.split("&");
        for (const searchTag of searchTags) {
            const tmp = searchTag.split("=");
            const key = tmp[0];
            const value = tmp[1];

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
            if (key === "vestingState") {
                vestingState = parseInt(value) || 1;
                if (vestingState < 1) {
                    vestingState = 1;
                }
                else if (vestingState > 5) {
                    vestingState = 5;
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
        }
    }

    return {
        text: text,
        categories: categories,
        sizes: sizes,
        genders: genders,
        vestingState: vestingState,
        minimumPrice: minimumPrice,
        maximumPrice: maximumPrice
    };
}
