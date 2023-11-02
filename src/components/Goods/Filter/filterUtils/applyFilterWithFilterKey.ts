export const applyFilterWithFilterKey = ({ min, max, updatedFilter, chekedData, category }: {
  min: any | null,
  max: any | null,
  updatedFilter: any[],
  chekedData: any, 
  category: string | null;
}) => {
    const priceFilterData: { [key: string]: any } = {};
    let additionalFilterData: { [category: string]: { [article: string]: any } } = {};
    if (min !== null || max !== null) {
        if (chekedData) {
            Object.keys(chekedData).forEach((selectedCategory) => {
                const categoryGoods = chekedData[selectedCategory];
                Object.keys(categoryGoods).forEach((article) => {
                    const articleData = categoryGoods[article];
                    const price = articleData.ціна;
                    if (min && max) {
                        if (!isNaN(price) && price >= parseInt(min) && price <= parseInt(max)) {
                            if (!priceFilterData[selectedCategory]) {
                                priceFilterData[selectedCategory] = {}
                            }
                            priceFilterData[selectedCategory][article] = articleData;
                        }
                    }
                });
            });
        }
        chekedData = priceFilterData
    }

    console.log('price', chekedData)
    if (updatedFilter.length > 0) {
        console.log(updatedFilter, 'updateFilter')
        updatedFilter.forEach((filter: any) => {
            const { key, value } = filter;
            let selectedCategory: any;
            let categoryGoods: any;
            if (category) {
                selectedCategory = category
            }
            if (chekedData) {
                categoryGoods = chekedData[selectedCategory];
            }
            console.log(selectedCategory, 'selectedCategory', categoryGoods)
            if (categoryGoods) {
                Object.keys(categoryGoods).forEach((article) => {
                    const articleData = categoryGoods[article];
                    if (articleData[key] && articleData[key] === value) {
                        if (!additionalFilterData[selectedCategory]) {
                            additionalFilterData[selectedCategory] = {};
                        }
                        additionalFilterData[selectedCategory][article] = articleData;
                    }
                });
            }
        });
        chekedData = additionalFilterData;
        console.log('filter', chekedData)
    }
    console.log('finish', chekedData)
    return chekedData
}
