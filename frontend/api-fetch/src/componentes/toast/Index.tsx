import * as React from 'react'
import { Root as ToastRoot, ToastAction } from '@radix-ui/react-toast'

export const Toast = ToastRoot;
export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastRoot>
export type ToastActionElement = React.ReactElement<typeof ToastAction>
