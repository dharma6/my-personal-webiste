'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function PageViewTracker({ measurementId }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || !window.gtag) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    window.gtag('config', measurementId, { page_path: url });
  }, [pathname, searchParams, measurementId]);

  return null;
}

export default function GoogleAnalytics({ measurementId }) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', { page_path: window.location.pathname });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
