import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface StaticPageProps {
  title: string;
  content: React.ReactNode;
}

export default function StaticPage({ title, content }: StaticPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-heading font-bold text-4xl mb-8">{title}</h1>
        <div className="prose prose-lg max-w-none space-y-4 text-foreground/80">
          {content}
        </div>
      </div>

      <Footer />
    </div>
  );
}
