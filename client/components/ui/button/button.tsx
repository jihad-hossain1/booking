import { clsx } from "clsx";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export const Button = ({ children, variant = "default", size = 'sm', className, disabled=false, ...props }: ButtonProps) => {
    const variants = {
        default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90',
        outline: 'border border-input bg-background hover:bg-muted/50 hover:text-primary',
        ghost: 'hover:bg-muted/50 hover:text-primary',
        success: 'bg-green-500 text-white hover:bg-green-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'bg-blue-500 text-white hover:bg-blue-600',
    }

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
    }

    

    return (
        <button className={clsx(
            'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors duration-200 focus:ring-2 focus:ring-primary focus:ring-opacity-50',
        variants[variant], sizes[size],{'opacity-50 cursor-not-allowed': disabled}, className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}


Button.displayName = "Button";