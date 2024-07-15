import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page not exist</h1>
      <p className="text-lg mb-8">Sorry, we can't find what you're looking for.</p>
      <Link className="text-blue-500 hover:underline" href="/">
      Return to the main page
      </Link>
    </div>
  );
};

export default Custom404;
