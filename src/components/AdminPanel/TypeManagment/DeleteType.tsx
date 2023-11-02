import { deleteGoodsType } from '../../../Service/deleteGoodsType'
import { useFetchDocumentsQuery } from '../../../store/slice/fireStoreApi';

const DeleteType = () => {
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");

    const handleDelete = (id: string) => {
        deleteGoodsType(id);
    };

    return (
        <section>
            <h2>Видаліть тип товару</h2>
            {data && data.map((item: any, index: number) => (
                <button key={index} onClick={() => handleDelete(item.id)}>{item.id}</button>
            ))}
        </section>
    );
};

export default DeleteType;
