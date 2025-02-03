import React, { Component, ReactNode } from 'react';

interface CapturarErrorProps {
  children: ReactNode;
  titleName: string;
}

interface CapturarErrorState {
  hasError: boolean;
}

/**
 * Componente que captura errores al cargar un microfronent.
 * 
 * @param props 
 * @returns 
 */
class CapturarError extends Component<CapturarErrorProps, CapturarErrorState> {
  constructor(props: CapturarErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("CapturarError caught an error", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("CapturarError caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p style={{color:"red"}}>{this.props.titleName}: Error al cargar.</p>;
    }

    return this.props.children;
  }
}

export default CapturarError;