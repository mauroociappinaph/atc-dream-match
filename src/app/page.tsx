import React from "react";
import Link from "next/link";
import Layout from "./layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Bienvenido a nuestra plataforma
          </h1>
          <p className="text-muted-foreground">
            Descubre cómo nuestra solución puede ayudarte a alcanzar tus
            objetivos.
          </p>
          <Link
            href="/teams"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Empezar
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
