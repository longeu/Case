import React, { lazy, Suspense } from "react";

type ImportFunc = () => Promise<{
  default: React.ComponentType<any>;
}>;

export const LazyLoading = (importFunc: ImportFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props: React.ComponentProps<typeof LazyComponent>) => (
    <Suspense fallback={<h2>Loading...</h2>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
