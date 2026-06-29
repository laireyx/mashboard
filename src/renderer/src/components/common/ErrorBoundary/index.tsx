import { Component, type ReactNode } from 'react';

interface ErrorBoundaryFallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (props: ErrorBoundaryFallbackProps) => ReactNode;
  onReset?: () => void;
  resetKeys?: unknown[];
}

interface ErrorBoundaryState {
  error: unknown;
}

function hasResetKeyChanged(
  previousResetKeys: unknown[] = [],
  resetKeys: unknown[] = [],
) {
  return (
    previousResetKeys.length !== resetKeys.length ||
    previousResetKeys.some((resetKey, index) => resetKey !== resetKeys[index])
  );
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error };
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (
      this.state.error !== null &&
      hasResetKeyChanged(previousProps.resetKeys, this.props.resetKeys)
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  render() {
    if (this.state.error !== null) {
      return this.props.fallback({
        error: this.state.error,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }

    return this.props.children;
  }
}
