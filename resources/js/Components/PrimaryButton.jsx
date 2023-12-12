export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-0.5 border rounded-md font-semibold text-xs text-black bg-yellow-300 uppercase tracking-widest focus:ring-offset-2 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
