"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../layout";
import playersApi from "@/api/playersApi";
import Button from "../../components/ui/Button";

interface Player {
  id: string;
  name: string;
}

interface Team {
  id: number;
  name: string;
  players: Player[];
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Equipo 1", players: [] },
    { id: 2, name: "Equipo 2", players: [] },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setLoading(true);
    playersApi
      .getPlayers(searchTerm)
      .then((players) => {
        setAvailablePlayers(players);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load players:", error);
        setError("Failed to load players");
        setLoading(false);
      });
  };

  const handleAddTeam = () => {
    const newId = teams.length + 1;
    const newName = `Equipo ${newId}`;
    setTeams([...teams, { id: newId, name: newName, players: [] }]);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Equipos</h1>
        <input
          type="text"
          placeholder="Buscar jugador por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
        />
        <Button
          onClick={handleSearch}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Buscar
        </Button>
        <ul>
          {teams.map((team) => (
            <li key={team.id} className="mb-2">
              <div className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                {team.players.map((player) => (
                  <p key={player.id} className="text-gray-600">
                    {player.name} (ID: {player.id})
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleAddTeam}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Añadir Equipo
        </Button>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default Teams;
