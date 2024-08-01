// components/PlayersLogic.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import playersApi from "@/api/playersApi";
import { Player, Team } from "@/types/Types";
import PlayersUI from "./PlayerUI";
import Modal from "@/components/Modal";

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

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
    }),
    []
  );

  useEffect(() => {
    fetchPlayers(searchTerm);
  }, [searchTerm, fetchPlayers]);

  const handleAddPlayerToTeam = (teamId: number, playerId: number) => {
    setTeams((prevTeams) => {
      const team = prevTeams.find((team) => team.id === teamId);
      const player = playersMap.get(playerId);

      if (!team || !player) return prevTeams;

      // Validar si el equipo ya tiene 5 jugadores
      if (team.players.length >= 5) {
        setModalMessage("El equipo ya tiene 5 jugadores.");
        setModalOpen(true);
        return prevTeams;
      }

      // Validar si el jugador ya está en otro equipo
      const isPlayerInAnyTeam = prevTeams.some((team) =>
        team.players.some((p) => p.id === playerId)
      );
      if (isPlayerInAnyTeam) {
        setModalMessage("El jugador ya está asignado a otro equipo.");
        setModalOpen(true);
        return prevTeams;
      }

      // Agregar el jugador al equipo
      return prevTeams.map((team) =>
        team.id === teamId
          ? { ...team, players: [...team.players, player] }
          : team
      );
    });
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
    <>
      <PlayersUI
        teams={teams}
        setTeams={setTeams}
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
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Información"
        message={modalMessage}
        confirmButtonText="Cerrar"
        onConfirm={() => setModalOpen(false)}
      />
    </>
  );
};

export default Players;
