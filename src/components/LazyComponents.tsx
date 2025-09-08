import { lazy } from 'react';

// Lazy load heavy components to improve initial page load
// These are examples - update paths to match your actual component locations

// Example: Lazy load the Certificate component (this one exists)
export const Certificate = lazy(() => import('./certificate/Certificate'));

// Example: Lazy load exam pages
export const ExamPage = lazy(() => import('../backend/pages/ExamsPage'));

// Generic loading fallback component
export const LazyLoadingFallback = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Example usage for other components (uncomment and update paths as needed):
// export const Charts = lazy(() => import('./path/to/Charts'));
// export const PDFViewer = lazy(() => import('./path/to/PDFViewer'));
