import { useAppSelector } from '../../../../../hooks/redux-hooks';

const Characteristics = () => {
    const item = useAppSelector((state) => state.item.selectedItem);

    const excludedFields = ['img', 'назва', 'ціна', 'рейтинг', 'відгуки'];

    if (!item) {
        return <div>Завантаження...</div>;
    }

    const renderFields = () => {
        return Object.keys(item).map((key) => {
            if (!excludedFields.includes(key)) {
            return (
                <li key={key}>
                <strong>{key}: </strong>
                {item[key]}
                </li>
            );
            }
            return null;
        });
    };

    return (
        <section className='characteristics-section'>
            <h3>Характерстики</h3>
            <ul>{renderFields()}</ul>
        </section>
    );
};

export default Characteristics;