"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Layout from "../layout";
import playersApi from "@/api/playersApi";
import { debounce } from "lodash";
import Button from "@/components/ui/Button";

interface Player {
  id: number;
  name: string;
  image: string;
  position?: string;
  team?: string;
}

interface Team {
  id: number;
  name: string;
  players: Player[];
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Equipo 1", players: [] },
    { id: 2, name: "Equipo 2", players: [] },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const playersPerPage = 6;

  const playersMap = useMemo(() => {
    const map = new Map<number, Player>();
    availablePlayers.forEach((player) => {
      map.set(player.id, player);
    });
    return map;
  }, [availablePlayers]);

  const debouncedFetchPlayers = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.trim() === "") {
        setAvailablePlayers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const players = await playersApi.getPlayers(searchTerm);
        const uniquePlayers = new Map<number, Player>();
        players.forEach((player) => {
          if (player && !uniquePlayers.has(player.id)) {
            uniquePlayers.set(player.id, player);
          }
        });
        setAvailablePlayers(Array.from(uniquePlayers.values()));
      } catch (error: any) {
        setError(`Error al cargar jugadores: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchPlayers(searchTerm);
  }, [searchTerm, debouncedFetchPlayers]);

  const handleAddPlayerToTeam = useCallback(
    (teamId: number, playerId: number) => {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === teamId
            ? {
                ...team,
                players: [
                  ...team.players,
                  playersMap.get(playerId) || undefined,
                ],
              }
            : team
        )
      );
    },
    [playersMap]
  );

  const handleNextPage = useCallback(() => {
    if (
      currentPage < Math.ceil(availablePlayers.length / playersPerPage) &&
      availablePlayers.length > 0
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, availablePlayers.length, playersPerPage]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const currentPlayers = availablePlayers.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Jugadores</h1>
        <div className="flex flex-wrap flex-col justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Buscar jugador por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {loading && <div className="text-sm text-blue-600">Cargando...</div>}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
        {searchTerm && (
          <div className="mt-4 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center align-center">
            {currentPlayers.map((player) => (
              <div
                key={player.id}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-colors hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={player.image}
                  alt={player.name}
                />
                <div className="p-5 text-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {player.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {player.position}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {player.team}
                  </p>
                  <div className="flex justify-around mt-4">
                    <Button onClick={() => handleAddPlayerToTeam(1, player.id)}>
                      Add to Team 1
                    </Button>
                    <Button onClick={() => handleAddPlayerToTeam(2, player.id)}>
                      Add to Team 2
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between width-full px-4 my-4">
          <Button onClick={handlePreviousPage} disabled={currentPage <= 1}>
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(availablePlayers.length / playersPerPage)
            }
          >
            Next
          </Button>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default Teams;
