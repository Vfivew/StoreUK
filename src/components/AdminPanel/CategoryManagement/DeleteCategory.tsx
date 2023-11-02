import { useState, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { deleteCategory } from '../../../Service/deleteCategory';

const DeleteCategory = () => {
    const [skip, setSkip] = useState(true);
    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const [itemId, setItemId] = useState<string>('')
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });
   
    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId)
        setSkip(false);
        console.log(itemId); 
    };

    const handleDelete = async (key: any) => {
        if (!fetchedData) {
            console.log("Fetched data is null or undefined");
            return;
        }

        const newData = { ...fetchedData };
        delete newData[key];
        await deleteCategory(newData, itemId);
        console.log("delete:", key);
    };

    return (
        <section className="delete-category-section">
            <h2>Видаліть категорію</h2>
            <p>Оберіть тип товару, а потім категорію, яку ви хочете видалити</p>
            {data && data.map((item: any, index: number) => (
                <button
                    onClick={() => handleChoiseType(item.id)}
                    key={index}>
                    {item.id}
                </button>
            ))}
            
                <div className='add-category-exist-category'>
            {
            fetchedData &&
            Object.keys(fetchedData).map((key, index) => (
                <button
                    onClick={()=>handleDelete(key)}
                    key={index} className="delete-button">{key}</button>
            ))}
            </div>
        </section>
    );
};

export default DeleteCategory;
