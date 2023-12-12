export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 text-yellow-300 shadow-sm focus:ring-yellow-300" +
                className
            }
        />
    );
}
