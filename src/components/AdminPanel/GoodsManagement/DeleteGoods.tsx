import { useState, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { deleteCategory } from '../../../Service/deleteCategory';

const DeleteGoods = () => {
    const [skip, setSkip] = useState<boolean>(true);
    const [itemId, setItemId] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const { data, isLoading, isError } = useFetchDocumentsQuery("Goods");
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });

    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
        console.log(itemId);
    };

    const handleChoiseCategory = async (key: string) => {
        console.log(key);
        setActiveKey(key); 
    };

    const handleNestedButtonClick = (article: string) => {
        if (fetchedData && activeKey && fetchedData[activeKey]) {
            const updatedData = {
                ...fetchedData,
                [activeKey]: {
                    ...fetchedData[activeKey]
                }
            };
            delete updatedData[activeKey][article];
            console.log(updatedData);
            deleteCategory(updatedData, itemId)
        }
    };

    const renderNestedButtons = () => {
        if (fetchedData && activeKey && fetchedData[activeKey]) {
            const nestedObjects = fetchedData[activeKey];
            return Object.keys(nestedObjects).map((nestedKey, index) => (
                <button key={index} onClick={() => handleNestedButtonClick(nestedObjects[nestedKey].article)}>
                    {nestedObjects[nestedKey].назва}
                </button>
            ));
        }
        return null;
    };


    return (
        <section className="delete-category-section">
            <h2>Видалити товар</h2>
            <p>Оберіть який товар ви хочете видалити</p>
            {data &&
                data.map((item: any, index: number) => (
                    <button onClick={() => handleChoiseType(item.id)} key={index}>
                        {item.id}
                    </button>
                ))}
            <div className="add-category-exist-category">
                {fetchedData &&
                    Object.keys(fetchedData).map((key, index) => (
                        <button onClick={() => handleChoiseCategory(key)} key={index} className="delete-button">
                            {key}
                        </button>
                    ))}
            </div>
            <div>{renderNestedButtons()}</div>
        </section>
    );
};

export default DeleteGoods;
