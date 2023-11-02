type Good = {
    [key: string]: any | null;
};

export const extractGoodsFromData = (data: { [key: string]: any } | null): Good[] => {
    let allGoods: Good[] = [];
    if (data) {
        Object.keys(data).forEach((category) => {
            const categoryGoods = data[category];
            if (categoryGoods) {
                Object.keys(categoryGoods).forEach((key) => {
                    allGoods.push(categoryGoods[key]);
                });
            }
        });
    }
    return allGoods;
};
