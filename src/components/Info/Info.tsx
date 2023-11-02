import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Info = ({ tabIndex }: { tabIndex: number }) => {
    const tabs = ["Оплата та доставка", "Обмін та повернення", "Контактна інформація"];
    const [activeTab, setActiveTab] = useState(tabIndex);
    const location = useLocation();

    useEffect(() => {
        const index = Number(location.pathname.split('/').pop());
        if (!isNaN(index)) {
            setActiveTab(index);
        }
    }, [location]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <main className='tabs-main'>
            <div className='tabs-wrapper'>
                <section className='tabs-section'>
                    <ul>
                        {tabs.map((tab, index) => (
                            <NavLink to={`/info/${index}`} key={index}>
                                <li
                                    className={`header-list-item ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {tab}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </section>
                <section className='info-section'>
                    {activeTab === 0 && (
                        <section>
                            <h3>Як здійснити оплату</h3>
                            <p>
                                Оплата є простою та безпечною. Ми приймаємо різні методи оплати, включаючи кредитні картки, PayPal та банківські перекази. Будь ласка, переконайтеся, що ваші дані для оплати є правильними, щоб уникнути будь-яких проблем з оплатою.
                            </p>
                        </section>
                    )}
                    {activeTab === 1 && (
                        <section>
                            <h3>Як ініціювати обмін або повернення</h3>
                            <p>
                                Щоб ініціювати обмін або повернення, зверніться до нашої служби підтримки клієнтів протягом 30 днів з моменту отримання замовлення. Надайте їм свої дані замовлення, і вони проведуть вас через процес, забезпечуючи гладкий та безпроблемний досвід.
                            </p>
                        </section>
                    )}
                    {activeTab === 2 && (
                        <section>
                            <h3>Часто задавані питання (ЧЗП)</h3>
                            <h4>1. Як я можу відстежити своє замовлення?</h4>
                            <p>
                                Ви можете легко відстежити своє замовлення, увійшовши в свій обліковий запис та перейшовши в розділ "Замовлення". Також ви можете звернутися до нашої служби підтримки для отримання допомоги з відстеженням вашого замовлення.
                            </p>
                            <h4>2. Які у вас години роботи магазину?</h4>
                            <p>
                                Наш магазин відкритий з понеділка по п'ятницю з 9:00 до 18:00. Ми не працюємо у вихідні та святкові дні. Завітайте до нас у робочий час або зв'яжіться з нами за допомогою електронної пошти чи телефону протягом цих годин.
                            </p>
                        </section>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Info;
