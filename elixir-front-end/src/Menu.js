import React, { useEffect, useState } from "react";
import "./Menu.css"; // Import the pure CSS file

const Menu = () => {
    const [menuData, setMenuData] = useState(null);

    useEffect(() => {
        // Simulating fetching data from API
        const fetchData = async () => {
            const data = await fetch("http://localhost:5000/api/menu") // Replace with your real API
                .then((res) => res.json())
                .catch((err) => console.error(err));

            setMenuData(data[0]); // Assuming the first object contains data
        };

        fetchData();
    }, []);

    if (!menuData) return <p>Loading...</p>;

    return (
        <div className="menu-container">
            {/* Hero Section */}
            <section className="head">
                <img src={menuData.heroSection.image} alt="Head" className="head-image" />
                <p className="head-text">{menuData.heroSection.paragraph}</p>
            </section>

            {/* Best Sellers Section */}
            <section className="best-sellers">
                <h2>Best Sellers</h2>
                <div className="best-seller-list">
                    {menuData.bestSellers.map((item) => (
                        <div key={item._id} className="best-seller-item">
                            <img src={item.image} alt={item.description} />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Menu Categories */}
            <section className="menu-categories">
                <h2>Our Menu</h2>
                {menuData.menuCategories.map((category) => (
                    <div key={category._id} className="category">
                        <h3>{category.categoryName}</h3>
                        <img src={category.image} alt={category.categoryName} className="category-image" />
                        <ul>
                            {category.items.map((item) => (
                                <li key={item._id}>
                                    {item.name} - <span>${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Menu;
