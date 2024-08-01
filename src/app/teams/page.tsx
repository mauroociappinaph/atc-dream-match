// pages/players.tsx
"use client";
import React from "react";
import Players from "@/components/PlayerLogic";
import Layout from "../../app/layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <Players />
    </Layout>
  );
};

export default Home;
