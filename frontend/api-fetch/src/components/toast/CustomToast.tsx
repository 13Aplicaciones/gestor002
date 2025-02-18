import * as Toast from '@radix-ui/react-toast';

interface CustomToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionText?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ open, onOpenChange, title, description, actionText }) => {
  return (
    <Toast.Provider>
      <Toast.Root open={open} onOpenChange={onOpenChange}>
        <Toast.Title>{title}</Toast.Title>
        <Toast.Description>{description}</Toast.Description>
        {actionText && (
          <Toast.Action altText="Close" asChild>
            <button>{actionText}</button>
          </Toast.Action>
        )}
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default CustomToast;