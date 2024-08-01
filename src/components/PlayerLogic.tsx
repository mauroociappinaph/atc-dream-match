// components/PlayersLogic.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import playersApi from "@/api/playersApi";
import { Player, Team } from "@/types/Types";
import PlayersUI from "./PlayerUI";

const Players: React.FC = () => {
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
    return new Map<number, Player>(
      availablePlayers.map((player) => [player.id, player])
    );
  }, [availablePlayers]);

  const fetchPlayers = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setAvailablePlayers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const players = await playersApi.getPlayers(searchTerm);
        setAvailablePlayers(players);
      } catch (error: any) {
        setError(`Error al cargar jugadores: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchPlayers(searchTerm);
  }, [searchTerm, fetchPlayers]);

  const handleAddPlayerToTeam = (teamId: number, playerId: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? { ...team, players: [...team.players, playersMap.get(playerId)!] }
          : team
      )
    );
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const startIndex = (currentPage - 1) * playersPerPage;
  const currentPlayers = availablePlayers.slice(
    startIndex,
    startIndex + playersPerPage
  );

  return (
    <PlayersUI
      teams={teams}
      setTeams={setTeams} // Añadir esta línea
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      availablePlayers={availablePlayers}
      currentPlayers={currentPlayers}
      loading={loading}
      error={error}
      currentPage={currentPage}
      playersPerPage={playersPerPage}
      handleAddPlayerToTeam={handleAddPlayerToTeam}
      handlePageChange={handlePageChange}
    />
  );
};

export default Players;
