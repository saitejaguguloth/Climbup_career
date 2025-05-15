
import { useState, useEffect, createContext, useContext } from 'react';

type ToastType = 'default' | 'destructive' | 'success' | 'warning';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 11);
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    const toast = (props: Omit<Toast, 'id'>) => {
      console.warn('Toast was called outside of ToastProvider');
      // Simplified toast function for when we're outside the context
      if (typeof document !== 'undefined') {
        console.log('Toast:', props.title, props.description);
      }
    };
    
    return {
      toast,
    };
  }
  
  const { addToast } = context;
  
  const toast = (props: Omit<Toast, 'id'>) => {
    addToast({
      ...props,
      duration: props.duration || 5000,
    });
  };
  
  return {
    toast,
  };
};

export const toast = (props: Omit<Toast, 'id'>) => {
  const { toast: addToast } = useToast();
  addToast(props);
};
