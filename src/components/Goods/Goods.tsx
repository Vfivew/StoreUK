import { useFetchDocumentByIdQuery } from "../../store/slice/fireStoreApi";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setGoodsData,setGoodsType, setPrevItemId,resetFilter } from "../../store/slice/goodsSlice";
import { useEffect } from "react";
import { setSortData } from '../../store/slice/sortSlice';
import { extractGoodsFromData } from "../../utils/extractGoodsFromData";

import StatusDetermine from "../../utils/StatusDetermine/StatusDetermine";
import NavigationMiniBar from "./NavigationMiniBar/NavigationMiniBar";
import Filter from "./Filter/Filter";
import GoodsList from "../GoodsList/GoodsList";
import Sort from "./Sort/Sort";

const Goods = () => {
  const prevItemId = useAppSelector((state) => state.goods.prevItemId)
  const { itemId } = useParams();
  const { data, isLoading, isError } = useFetchDocumentByIdQuery(`${itemId}`);
  const dispatch = useAppDispatch();
  const goods = useAppSelector((state) => state.goods.filteredData);
  let allGoods = extractGoodsFromData(goods);

  useEffect(() => {
    dispatch(resetFilter())
    if (itemId !== prevItemId && !isLoading && !isError)
      {
        dispatch(setGoodsData(data));
        dispatch(setPrevItemId(itemId));
      }
  }, [data]);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setGoodsType(data))
      dispatch(setSortData(allGoods));
    } 
  }, [data, isLoading, isError, allGoods, dispatch]);
  
  return (
    <main className="goods">
      <section className="goods-wrapper">
        <StatusDetermine isLoading={isLoading} isError={isError} data={data} />
          <section className="goods-title">
             <NavigationMiniBar propsArray={['Goods', itemId]} />
          </section>
        <section className="goods-section">
          <section className="goods-filter-wrapper">
            <h2>{itemId}</h2>
            <Filter />
          </section>
            <section className="goods-list-section">
              <Sort/>
              <GoodsList/>
            </section>
          </section>
      </section>
    </main>
  );
};

export default Goods;
