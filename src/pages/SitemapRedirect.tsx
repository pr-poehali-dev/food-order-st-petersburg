import { useEffect } from 'react';

export default function SitemapRedirect() {
  useEffect(() => {
    window.location.href = 'https://functions.poehali.dev/6606b5f5-2b30-4f96-80bb-af7561d589bd';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to sitemap...</p>
    </div>
  );
}
