import { Suspense, Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('Three.js Canvas Error (non-critical):', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="hidden" />;
    }

    return this.props.children;
  }
}

interface SafeThreeProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const SafeThreeProvider = ({ children, fallback }: SafeThreeProviderProps) => {
  return (
    <ThreeErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || <div className="hidden" />}>
        {children}
      </Suspense>
    </ThreeErrorBoundary>
  );
};