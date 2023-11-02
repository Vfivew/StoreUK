import { useState, ChangeEvent, useEffect } from 'react';
import { useFetchDocumentsQuery, useFetchDocumentByIdQuery } from '../../../store/slice/fireStoreApi';
import { addCategory } from '../../../Service/addCategory';

const AddCategory = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [article, setArticle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('')
    const [characteristics, setCharacteristics] = useState<{ key: string; value: string }[]>([]);
    const [skip, setSkip] = useState(true);
    const { data, isLoading, isError } = useFetchDocumentsQuery("GoodsUK");
    const [itemId, setItemId] = useState<string>('');
    const { data: fetchedData } = useFetchDocumentByIdQuery(itemId, { skip });

    useEffect(() => {
        if (!skip && fetchedData) {
            console.log(fetchedData);
        }
    }, [fetchedData, skip]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Zа-яА-ЯіІїЇґҐ]+$/;
        if (value === '' || regex.test(value)) {
            setInputValue(value);
        }
    };

    const handleArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setArticle(e.target.value);
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    };

    const handleCharacteristicsChange = (index: number, key: string, value: string) => {
        const updatedCharacteristics = [...characteristics];
        updatedCharacteristics[index] = { key, value };
        setCharacteristics(updatedCharacteristics);
    };

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, { key: '', value: '' }]);
    };

    const handleChoiseType = (itemId: string) => {
        setItemId(itemId);
        setSkip(false);
        console.log(itemId);
    };

    const handleAdd = () => {
        if (!fetchedData) {
            console.log("Fetched data is null or undefined");
            return;
        }

        const found = Object.keys(fetchedData).find(key => key === inputValue);
        if (found) {
            console.log(`Data with name ${inputValue} already exists`);
        } else {
            const characteristicsObject = Object.fromEntries(characteristics.map(item => [item.key, item.value]));
            const newData = {
                ...fetchedData,
                [inputValue]: {
                    [article]: {
                        ціна: price,
                        назва: name,
                        article: article,
                        img: image,
                        відгуки: [],
                        рейтинг:[],
                        ...characteristicsObject
                    }
                }
            };
            addCategory(newData, itemId);
            console.log("Add:", newData);
        }
    };

    return (
        <section className="add-category-section">
            <h2>Додати категорію</h2>
            <p>Оберіть тип товару, куди ви хочети додати категорію</p>
            {data && data.map((item: any, index: number) => (
                <button
                    onClick={() => handleChoiseType(item.id)}
                    key={index}>
                    {item.id}
                </button>
            ))}
            {fetchedData && (
                <div>
                    <input
                        placeholder='Enter the name of Category'
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <p>Додайте перший товар в новій категорії</p>
                    <input
                        placeholder='Додайте артикул'
                        type="text"
                        value={article}
                        onChange={handleArticleChange}
                        className="input-field"
                    />
                    <input
                        placeholder='Додайте ціну'
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        className="input-field"
                    />
                    <input
                        placeholder='Обреіть найменування'
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="input-field"
                    />
                    <input
                        placeholder='Посилання на картинку'
                        type="text"
                        value={image}
                        onChange={handleImageChange}
                        className="input-field"
                    />
                    {characteristics.map((characteristic, index) => (
                        <div key={index}>
                            <input
                                placeholder='Задайте характеристику'
                                type="text"
                                value={characteristic.key}
                                onChange={(e) => handleCharacteristicsChange(index, e.target.value, characteristic.value)}
                                className="input-field"
                            />
                            <input
                                placeholder='Оберіть значення характеристики'
                                type="text"
                                value={characteristic.value}
                                onChange={(e) => handleCharacteristicsChange(index, characteristic.key, e.target.value)}
                                className="input-field"
                            />
                        </div>
                    ))}
                    <button onClick={handleAddCharacteristic} className="add-button">Більше характеристик</button>
                    <button onClick={handleAdd} className='final-add-button'>Додати</button>
                </div>
            )}
        </section>
    );
};

export default AddCategory;
