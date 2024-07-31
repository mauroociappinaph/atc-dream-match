import React from "react";
import Link from "next/link";
import Layout from "./layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a ATC Dream Match
        </h1>
        <Link href="/teams" className="text-blue-500 underline">
          Ver equipos
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
