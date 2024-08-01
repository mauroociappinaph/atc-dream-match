"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "../layout";
import playersApi from "@/api/playersApi";
import Button from "../../components/ui/Button";
import { debounce } from "lodash";

const Teams = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: "Equipo 1", players: [] },
    { id: 2, name: "Equipo 2", players: [] },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 6;

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = availablePlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const debouncedFetchPlayers = useCallback(
    debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const players = await playersApi.getPlayers(searchTerm);
        setAvailablePlayers(players);
      } catch (error) {
        setError(`Error al cargar jugadores: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchPlayers(searchTerm);
    }
  }, [searchTerm, debouncedFetchPlayers]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(availablePlayers.length / playersPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Equipos</h1>
        <div className="flex flex-wrap justify-center gap-4">
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
        <div className="mt-4 w-full max-w-4xl grid grid-cols-3 gap-4">
          {currentPlayers.map((player) => (
            <div
              key={player.id}
              className="bg-white p-4 shadow rounded-lg text-center cursor-pointer"
              onClick={() => console.log(`Selected: ${player.name}`)}
            >
              {player.image && (
                <img
                  src={player.image}
                  alt={player.name}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              <div>{player.name}</div>
              <div>{player.completeName}</div>
              <Button onClick={() => handleAddPlayerToTeam(1, player.id)}>
                Add to Team 1
              </Button>
              <Button onClick={() => handleAddPlayerToTeam(2, player.id)}>
                Add to Team 2
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between width-full px-4 my-4">
          <Button onClick={handlePreviousPage}>Previous</Button>
          <Button onClick={handleNextPage}>Next</Button>
        </div>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default Teams;
