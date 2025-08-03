import React, { useState, useEffect } from "react";
import "./Layer.css"

function Layer({ name, options, index, setIndex, isRandomizing }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentImage, setCurrentImage] = useState(options[index]);

    const cycleLeft = () => {
        if (!isTransitioning && !isRandomizing) {
            setIsTransitioning(true);
            setTimeout(() => {
                const newIndex = (index - 1 + options.length) % options.length;
                setIndex(newIndex);
            }, 150); // Half of transition duration
        }
    };

    const cycleRight = () => {
        if (!isTransitioning && !isRandomizing) {
            setIsTransitioning(true);
            setTimeout(() => {
                const newIndex = (index + 1) % options.length;
                setIndex(newIndex);
            }, 150); // Half of transition duration
        }
    };

    // Update current image when index changes
    useEffect(() => {
        if (isTransitioning || isRandomizing) {
            setTimeout(() => {
                setCurrentImage(options[index]);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 150);
            }, 150);
        } else {
            setCurrentImage(options[index]);
        }
    }, [index, options, isTransitioning, isRandomizing]);

    return (
        <>
            <div className="layer">
                <img
                    src={`/assets/${name}/${currentImage}`} 
                    className={`clothes ${name} ${isTransitioning || isRandomizing ? 'transitioning' : ''}`}
                    draggable="false"
                />
                <div className="nav-buttons">
                    <button onClick={cycleLeft} disabled={isTransitioning || isRandomizing}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button onClick={cycleRight} disabled={isTransitioning || isRandomizing}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Layer;