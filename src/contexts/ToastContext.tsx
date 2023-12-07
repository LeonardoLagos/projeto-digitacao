import { ReactNode, createContext } from 'react';
import toast, { DefaultToastOptions, Renderable, Toast, ToastOptions, Toaster, ValueOrFunction } from 'react-hot-toast';

interface ToastProviderProps {
    children: ReactNode
  }
  type Message = ValueOrFunction<Renderable, Toast>;
  type ToastHandler = (message: Message, options?: ToastOptions) => string;
  
type ToastContextData = {
    toast: {
        (message: Message, opts?: ToastOptions): string;
        error: ToastHandler;
        success: ToastHandler;
        loading: ToastHandler;
        custom: ToastHandler;
        dismiss(toastId?: string): void;
        remove(toastId?: string): void;
        promise<T>(promise: Promise<T>, msgs: {
            loading: Renderable;
            success: ValueOrFunction<Renderable, T>;
            error: ValueOrFunction<Renderable, any>;
        }, opts?: DefaultToastOptions): Promise<T>;
    };
}

export const ToastContext = createContext({} as ToastContextData)

export function ToastProvider({ children }: ToastProviderProps) {
    const meuToast = toast
    return (
        <ToastContext.Provider value={{toast: meuToast}} >
            <Toaster />
            {children}
        </ToastContext.Provider>
    )
}