import Layout from "../components/layout";
import Link from 'next/link';


export default function Home() {
  return (
    <Layout>
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
      </main>
    </Layout>
  );
}

