import Layout from "../components/layout";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
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
      </main>


    </Layout>
  );
}


