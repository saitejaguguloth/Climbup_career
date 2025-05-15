
import { Toast } from '@/contexts/toast-context';
import { useToastContext } from '@/contexts/toast-context';

// This hook provides toast functionality and handles the case when
// it's called outside of a ToastProvider context
export const useToast = () => {
  // Try to use the toast context, but provide a fallback if it's not available
  try {
    const context = useToastContext();
    
    const { addToast } = context;
    
    const toast = (props: Omit<Toast, 'id'>) => {
      addToast({
        ...props,
        duration: props.duration || 5000,
      });
    };
    
    return {
      toast,
      toasts: context.toasts,
      removeToast: context.removeToast
    };
  } catch (error) {
    // Fallback for when we're outside the context
    const toast = (props: Omit<Toast, 'id'>) => {
      console.warn('Toast was called outside of ToastProvider');
      if (typeof document !== 'undefined') {
        console.log('Toast:', props.title, props.description);
      }
    };
    
    return {
      toast,
      toasts: [],
      removeToast: (id: string) => {}
    };
  }
};

// Simple function to create a toast without needing to destructure from the hook
export const toast = (props: Omit<Toast, 'id'>) => {
  const { toast: addToast } = useToast();
  addToast(props);
};
