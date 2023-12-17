
export default function Guest({ children }) {
    return (
        <div className="h-screen min-h-screen flex flex-col sm:justify-center items-center ">
            <div className="w-full mt-6 px-6 py-7 ">
                {children}
            </div>
        </div>
    );
}
