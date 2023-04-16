export default function Canvas({ children }) {
    return (
        <div className="flex justify-center items-center w-full min-h-[80svh] py-8">
            <div className="min-h-[600px]">
                {children}
            </div>
        </div>
    )
}