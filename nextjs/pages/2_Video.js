import Layout from "../components/layout";
import Link from 'next/link';


export default function Home() {
  return (
    <Layout>
      <nav className="bg-gray-800">
        <div className="max-w-7x2 mx-auto px-2 sm:px-6 lg:px-8 bg-black">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4 bg-black">
                  <Link href='/CanadianCustomers' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">🇨🇦 Customers</Link>
                  <Link href='/RentVideos' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Rent Videos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              LOG IN
              <br />
            </h1>
            <p>
              Please enter Video ID
            </p>
            <br />
            <form>
              <label className = "inline-flex text-medium font-medium">
                Video ID:   
                <input type="text" />
              </label>
              {/* <button type="submit">Next</button> */}
            </form>
            
            <div className="mt-6 text-center md:ml-6">
              <Link
                className="transition duration-700 inline-flex items-center px-5 py-3 text-medium font-medium text-gray-300 text-xl transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white hover:transform hover:scale-125"
                aria-label="learn more"
                rel="noreferrer"
                href='/3_Customer'
              >
                <span className="flex justify-center">NEXT</span>
              </Link>
              <br className="sm:hidden" />
            </div>
          </div>
      
          <div className="relative w-full py-10 mx-auto text-center md:py-32 md:my-12 md:w-10/12">
            <div className="relative z-10">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://nextjstemplates.com/templates/plutonium"
              >
                <div className="flex justify-center">
                  <img
                    className="transition duration-700 rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
                    src="/next.svg"
                    alt="Placeholder Image"
                    width="350"
                  />
                </div>
              </a>
            </div>
            <p className="z-10 my-8 text-sm font-medium text-gray-500">
              :)
            </p>
          </div>
        </div>
        </section>
      </nav>
    </Layout>
  );
}