import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  validationErrorHandler = (event: CustomEvent) => {
    this.setState({
      hasError: true,
      errorMessage: event.detail.message,
    });
    console.error('Validation Error:', event.detail);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          {this.state.errorMessage && (
            <div className="error-message">{this.state.errorMessage}</div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
