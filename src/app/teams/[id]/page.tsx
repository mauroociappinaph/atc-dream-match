import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../layout";

const TeamDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const team = {
    id,
    name: `Equipo ${id}`,
    players: ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4", "Jugador 5"],
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">{team.name}</h1>
        <ul>
          {team.players.map((player, index) => (
            <li key={index} className="mb-2">
              {player}
            </li>
          ))}
        </ul>
        <Link href="/teams" className="text-blue-500 underline mt-4">
          Volver a la lista de equipos
        </Link>
      </div>
    </Layout>
  );
};

export default TeamDetail;
