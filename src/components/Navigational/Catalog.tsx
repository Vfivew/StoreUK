import { useEffect } from "react";
import { useFetchDocumentsQuery } from "../../store/slice/fireStoreApi";
import { setData } from "../../store/slice/documentsSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";

function Catalog() {
  const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      dispatch(setData(data));
    }
  }, [data, dispatch]);

}

export default Catalog;
