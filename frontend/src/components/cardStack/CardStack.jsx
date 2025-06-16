import './cardStack.css'
import { motion, AnimatePresence } from "framer-motion";
import { useState,useEffect } from 'react';

const cardsData = [
    { id: 1, image: "/Streamline.png" },
    { id: 2, image: "/Analyse.png" },
    { id: 3, image: "/Connect.png" },
];

const CardStack = () => {
    const [cards, setCards] = useState(cardsData);
useEffect(()=>{
    const interval = setInterval(()=>{
        setCards(prev =>{
            const newCards = [...prev];
            const topCard = newCards.shift();
            newCards.push(topCard);
            return newCards;
        })
    },5000)
    return ()=>clearInterval(interval)
},[])

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
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CardStack;