import { alertIcon, Alerts } from 'ux-ui';
import { Text } from '@radix-ui/themes';
import React, { Component, ReactNode } from 'react';

//TODO: Revisar si se puede mejorar el componente o pasar a la libreria api-fetch
/**
 * Propiedades del componente.
 * 
 * @author @omargo33
 * @since 2025-02-13
 */
interface CatchErrorLoadElementProps {
  children: ReactNode;
  titleName: string;
}

interface CatchErrorLoadElementState {
  hasError: boolean;
}

/**
 * Componente que captura errores al cargar un microfronent.
 * 
 * @param props 
 * @returns 
 */
class CatchErrorLoadElement extends Component<CatchErrorLoadElementProps, CatchErrorLoadElementState> {
  constructor(props: CatchErrorLoadElementProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("Caught an error", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text size="2" weight="medium" color="red">        
        {alertIcon({alert: Alerts.error})} No load: {this.props.titleName} </Text>
    }

    return this.props.children;
  }
}

export default CatchErrorLoadElement;
