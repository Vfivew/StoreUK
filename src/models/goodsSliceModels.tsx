export interface GoodsState {
  data: { [key: string]: any } | null;
  type: null | string; 
  filteredData: { [key: string]: any } | null;
  filterKey: string | null;
  activeButton: string | null;
  activeAdditionalFilter: any[];
  prevItemId: string;
  noAdditionalFilterData: { [key: string]: any } | null;
  minPrice: null | string;
  maxPrice: null | string,
}

export interface SortState{
  allGoods: null | { [key: string]: any },
  activeButton: null | string,
}

export interface ItemState{
  fullData: { [key: string]: any } | null;
  selectedItem: { [key: string]: any } | null;
  newFullData: { [key: string]: any } | null;
}

export interface BasketState {
  basket: any[];
  isBasketOpen: boolean;
};

export interface FormState {
  deliveryMethod: string;
  isOrderPlaced: boolean;
};

export interface BasketItemProps {
  item: any;
  quantity: number;
  itemId: any;
  handleModalClick?: () => void;
}