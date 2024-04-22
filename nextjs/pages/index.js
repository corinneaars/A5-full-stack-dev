import Layout from "../components/layout";
import Link from 'next/link';


export default function Home() {
  return (
    <Layout>
<<<<<<< HEAD
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Hello, click <Link href='/CanadianCustomers'>this link</Link> to see our totally awesome query.</h1>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={200}
          height={200}
          class = "invert"
        />        
        <Image
          src="/vercel.svg"
          alt="Next.js Logo"
          width={200}
          height={200}
          class = "invert"
        />
=======
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href='/CanadianCustomers' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">🇨🇦 Customers</Link>
                  <Link href='/RentVideos' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Rent Videos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="container py-5">
        <h1>Welcome to our Video Store!</h1>
        {/* <p>
          Our video store is backed by MySQL's Sakila database, one of the most popular and reliable databases in the industry. MySQL is used by many of the world's largest and fastest-growing organizations to save time and money powering their high-volume websites, business-critical systems, and packaged software.
        </p>
        <p>
          We use Next.js, a React framework that enables features like server-side rendering and generating static websites for React based web applications. It is one of the top frameworks for building React applications.
        </p>
        <p>
          Our backend is powered by FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. It is one of the fastest Python frameworks available, on par with NodeJS and Go.
        </p> */}
>>>>>>> a286158 (current state (4/22))
      </main>
    </Layout>
  );
}

