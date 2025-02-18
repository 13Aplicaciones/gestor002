import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';

const CustomToast = ({ open, onOpenChange, title, description, actionText }) => {
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