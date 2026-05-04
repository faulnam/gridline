import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline').catch(() => {
  // Fallback if Spline fails to load
  return { default: () => <div className="w-full h-full flex items-center justify-center text-cyan-accent">3D Model Loading...</div> };
}));

export function SplineScene({ scene, className }) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-accent/20 border-t-cyan-accent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-cyan-accent/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => console.log('Spline loaded successfully')}
        onError={(error) => console.error('Spline error:', error)}
      />
    </Suspense>
  );
}
