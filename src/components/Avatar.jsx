import React from "react";
import Layer from "./Layer";

function Avatar({ options, indexes, setIndexes, isRandomizing }) {
    return (
        <>
            <div className="avatar">
                {Object.keys(options).map((category) => {
                    return <Layer
                        key={category}
                        name={category}
                        options={options[category]}
                        index={indexes[category]}
                        setIndex={(newIndex) => setIndexes((prev) => ({ ...prev, [category]: newIndex }))}
                        isRandomizing={isRandomizing}
                    />
                })}
            </div>
        </>
    )
}

export default Avatar;