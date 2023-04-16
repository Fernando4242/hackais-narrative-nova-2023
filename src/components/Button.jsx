const BUTTON_TYPES = {
    "primary": "hover:bg-blue-600 bg-blue-700 text-white font-bold py-2 px-4 rounded",
    "secondary": "hover:bg-gray-600 bg-gray-700 text-white font-bold py-2 px-4 rounded"
}

export default function Button({children, type, className, ...props}){
    return (
        <button className={BUTTON_TYPES[type] + " " + className} {...props}>
            {children}
        </button>
    )
}