"use client";
// Imports
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../layout";
import playersApi from "@/api/playersApi";
import Button from "../../components/ui/Button";

// Player interface
interface Player {
  id: string;
  name: string;
}

// Team interface
interface Team {
  id: number;
  name: string;
  players: Player[];
}

// Teams component
const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Equipo 1", players: [] },
    { id: 2, name: "Equipo 2", players: [] },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState({ type: "", id: "" });

  // Load players based on search term
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setLoading(true);
      playersApi
        .getPlayers(searchTerm)
        .then((players) => {
          const filteredPlayers = players
            .filter((player) =>
              player.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim())
            )
            .slice(0, 9); // Limit results to 9
          setAvailablePlayers(filteredPlayers);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load players:", error);
          setError("Error al cargar jugadores");
          setLoading(false);
        });
    } else {
      setAvailablePlayers([]);
    }
  }, [searchTerm]);

  // Add a player to a team
  const handleAddPlayerToTeam = (teamId: number, playerId: string) => {
    const newTeams = teams.map((team) => {
      if (team.id === teamId) {
        const newPlayers = [
          ...team.players,
          availablePlayers.find((p) => p.id === playerId)!,
        ];
        return { ...team, players: newPlayers };
      }
      return team;
    });
    setTeams(newTeams);
  };

  // Edit team name
  const handleEditTeamName = (teamId: number, newName: string) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, name: newName } : team
    );
    setTeams(updatedTeams);
  };

  // Delete team
  const handleDeleteTeam = (teamId: number) => {
    setTeams(teams.filter((team) => team.id !== teamId));
  };

  // Delete player from a team
  const handleRemovePlayerFromTeam = (teamId: number, playerId: string) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const filteredPlayers = team.players.filter(
          (player) => player.id !== playerId
        );
        return { ...team, players: filteredPlayers };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  // Confirm action
  const confirmAction = (type: string, id: string) => {
    setCurrentAction({ type, id });
    setConfirmOpen(true);
  };

  // Execute confirmed action
  const executeAction = () => {
    if (currentAction.type === "deleteTeam") {
      handleDeleteTeam(parseInt(currentAction.id));
    } else if (currentAction.type === "deletePlayer") {
      const teamId = teams.find((team) =>
        team.players.some((p) => p.id === currentAction.id)
      )!.id;
      handleRemovePlayerFromTeam(teamId, currentAction.id);
    }
    setConfirmOpen(false);
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
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="mt-4 w-full max-w-4xl grid grid-cols-3 gap-4">
          {availablePlayers.map((player) => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayerId(player.id)}
              className="bg-white p-4 shadow rounded-lg text-center cursor-pointer"
            >
              {player.name}
            </div>
          ))}
        </div>
        {teams.map((team) => (
          <div key={team.id} className="mt-4 p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold">{team.name}</h2>
            <input
              type="text"
              value={team.name}
              onChange={(e) => handleEditTeamName(team.id, e.target.value)}
              className="text-lg mb-2"
            />
            {team.players.map((player) => (
              <div
                key={player.id}
                className="flex justify-between items-center"
              >
                <span>{player.name}</span>
                <Button
                  onClick={() => confirmAction("deletePlayer", player.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              onClick={() =>
                selectedPlayerId &&
                handleAddPlayerToTeam(team.id, selectedPlayerId)
              }
            >
              Add Selected Player
            </Button>
            <Button
              onClick={() => confirmAction("deleteTeam", team.id.toString())}
            >
              Delete Team
            </Button>
          </div>
        ))}
        {teams.length < 2 && (
          <Button
            onClick={() =>
              setTeams([
                ...teams,
                { id: teams.length + 1, name: "New Team", players: [] },
              ])
            }
          >
            Create New Team
          </Button>
        )}

        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default Teams;
