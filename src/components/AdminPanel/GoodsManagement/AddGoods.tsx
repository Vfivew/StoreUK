import { useState, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { addCategory } from '../../../Service/addCategory';

const AddGoods = () => {
    const [skip, setSkip] = useState(true);
    const [itemId, setItemId] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const [characteristicArray, setCharacteristicArray] = useState<string[]>([]);

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

    const handleCreateInput = (key: string) => {
        console.log(fetchedData,'looking me')
      
        if (fetchedData && fetchedData[key]) {
            setActiveKey(key);
            const foundObject = Object.values(fetchedData[key]).find(item => typeof item === 'object' && item !== null);
            if (typeof foundObject === 'object' && foundObject !== null) {
                const keysArray = Object.keys(foundObject).filter(key => key !== "рейтинг" && key !== "відгуки");
                console.log(keysArray);
                setCharacteristicArray(keysArray)
                const newInputValues = { ...inputValues };
                keysArray.forEach(dynamicKey => {
                    if (!newInputValues[dynamicKey]) {
                        newInputValues[dynamicKey] = ''; 
                    }
                });
                setInputValues(newInputValues);
                console.log(newInputValues)
            } else {
                console.log("The found object is not an object or is null");
            }
        } else {
            console.log("fetchedData, fetchedData[key], or fetchedData[key].article is undefined or null");
        }
    };

        const handleAddGood = () => {
        const valuesAreFilled = Object.values(inputValues).every(value => value && value.trim() !== '' && value !== undefined);
        console.log(inputValues)
        if (valuesAreFilled) {
            if (inputValues['article']) {
                const filteredValues = Object.keys(inputValues).reduce((obj: Record<string, string>, key) => {
                    if (key === 'article') {
                        obj[key] = inputValues[key];
                    } else {
                        obj[key] = inputValues[key];
                    }
                    return obj;
                }, {});
                const newObject = { [inputValues['article']]: { ...filteredValues, рейтинг: [], відгуки: [] } };
                console.log(newObject, 'newObj');

                if (activeKey) {
                    const newFetchedData = { ...fetchedData };
        
                    if (newFetchedData[activeKey]) {
                        newFetchedData[activeKey] = { ...newFetchedData[activeKey], ...newObject };
                    } else {
                        newFetchedData[activeKey] = { ...newObject };
                    }
                    console.log(newFetchedData);
                    addCategory(newFetchedData, itemId)
                } else {
                    console.log('activeKey is null');
                }
            } else {
                console.log('article is undefined or empty');
            }
        } else {
            console.log('Please fill in all fields');
        }
    };

    const renderInputs = (keysArray: string[]) => {
        console.log(keysArray)
        return keysArray.map((key, index) => {
            return (
                <div key={index}>
                    <label>{key}</label>
                    <input
                        type="text"
                        name={key}
                        onChange={(e) => {
                            setInputValues((prev) => ({ ...prev, [key]: e.target.value }));
                        }}
                    />
                </div>
            );
        });
    };

    return (
        <section className="add-category-section">
            <h2>Додайте товар</h2>
            <p>Оберіть тип для товару, який ви хочете додати</p>
            {data &&
                data.map((item: any, index: number) => (
                    <button onClick={() => handleChoiseType(item.id)} key={index}>
                        {item.id}
                    </button>
                ))}
            <div className="add-category-exist-category">
                <div className='category-wrapper'>
                    {fetchedData &&
                    Object.keys(fetchedData).map((key, index) => (
                        <div key={index}>
                            <button onClick={() => handleCreateInput(key)} className="delete-button">
                                {key}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {activeKey && fetchedData && fetchedData[activeKey] ? (
                <div className="add-category-exist-category">
                    {renderInputs(characteristicArray)}
                    <button className='final-add-button'
                        onClick={handleAddGood}>Додати</button>
                </div>
            ) : null}
        </section>
    );
};

export default AddGoods;
