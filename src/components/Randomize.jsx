function Randomize({ randomize, isRandomizing }) {
    return (
        <>
            <button 
                onClick={randomize} 
                className="random-btn"
                disabled={isRandomizing}
            >
                {isRandomizing ? 'Randomizing...' : 'Randomize!'}
            </button>
        </>
    )
}

export default Randomize;