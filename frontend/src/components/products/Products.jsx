import './Products.css'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';

const cardsData = [
    { id: 1, image: "/Streamline.png" },
    { id: 2, image: "/Analyse.png" },
    { id: 3, image: "/Connect.png" },
];

const Products = () => {
    const [cards, setCards] = useState(cardsData);

    const handleCardClick = () => {
        const newCards = [...cards];
        const topCard = newCards.shift(); // Remove first card
        newCards.push(topCard); // Add it to the end
        setCards(newCards);
    };

    //   return (
    //     <div className='product'>
    //         <div className='product-top'>
    //             <div>1</div>
    //             <div>2</div>
    //         </div>
    //         <div className='product-bottom'>3</div>
    //     </div>
    //   );
    return (
        <div className="card-stack">
            <AnimatePresence>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        layout
                        initial={{ scale: 0.95, x: 20 * index, y: 20 * index }}
                        animate={{ scale: 1, x: 20 * index, y: 20 * index }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="card"
                        style={{
                            backgroundImage: `url(${card.image})`,
                            zIndex: cards.length - index,
                        }}
                        onClick={handleCardClick}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Products;