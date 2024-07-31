import React from "react";
import Link from "next/link";
import Layout from "../layout";

const Teams: React.FC = () => {
  const teams = [
    { id: 1, name: "Equipo 1" },
    { id: 2, name: "Equipo 2" },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Equipos</h1>
        <ul>
          {teams.map((team) => (
            <li key={team.id} className="mb-2">
              <Link
                href={`/teams/${team.id}`}
                className="text-blue-500 underline"
              >
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="text-blue-500 underline mt-4">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default Teams;
