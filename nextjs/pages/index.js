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
                  <Link href='/AmericanCustomers' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Americans</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              Welcome to our
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 dark:from-green-500 dark:via-indigo-400 dark:to-purple-500">
                VIDEO STORE
              </span>
            </h1>
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
              Our NextJS DVD Rental Store allows users to add new customers and assign video rentals.
              Whether you're a new or returning user, we invite you to <b>log in</b> with the button below.
            </p>
            <div className="mt-6 text-center md:ml-6">
              <Link
                className="transition duration-700 inline-flex items-center px-5 py-3 text-medium font-medium text-gray-300 text-xl transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white hover:transform hover:scale-125"
                aria-label="learn more"
                rel="noreferrer"
                href='/1_Email'
              >
                {/* <div className="flex justify-center">
                  <img
                    className="transition duration-700 rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
                    src="/next.svg"
                    alt="Placeholder Image"
                    width="350"
                  />
                </div> */}
                <span href='/RentVideos' className="flex justify-center">LOG IN</span>
              </Link>
              <br className="sm:hidden" />
              {/* <a
                className="inline-flex items-center px-5 py-3 mt-2 ml-0 text-sm font-medium text-gray-700 transition duration-300 border rounded shadow dark:hover:border-gray-500 hover:shadow-md md:ml-2 dark:text-gray-300"
                aria-label="learn more"
              >
                <span className="flex justify-center">Rent</span>
              </a> */}
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