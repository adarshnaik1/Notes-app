export default function Button({ text, onClick }) {
    return (
        <button 
            className="px-8 py-4 bg-white text-black border-black z-10 w-md rounded-md hover:bg-black hover:text-white hover:border-white hover:border-2"
            onClick={onClick}
        >
            {text}
        </button>
    );
}