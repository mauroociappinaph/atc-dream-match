// src/components/PlayersUI.tsx
import React from "react";
import Button from "@/components/ui/Button";
import TeamComponent from "@/components/TeamsComponent";
import Loading from "@/components/ui/Loading";
import { PlayersUIProps } from "@/types/Types";

const PlayersUI: React.FC<PlayersUIProps> = ({
  teams,
  setTeams,
  searchTerm,
  setSearchTerm,
  availablePlayers,
  currentPlayers,
  loading,
  error,
  currentPage,
  playersPerPage,
  handleAddPlayerToTeam,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(availablePlayers.length / playersPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Jugadores</h1>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full max-w-2xl gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar jugador por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {loading && <Loading />}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
        {currentPlayers.map((player) => (
          <div
            key={player.id}
            className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
          >
            <img
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              width="500"
              height="500"
              className="object-cover w-full h-64"
              style={{ aspectRatio: "500 / 500", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold">{player.name}</h3>
              <p className="text-sm text-muted-foreground">{player.position}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="grid gap-1">
                  <Button onClick={() => handleAddPlayerToTeam(1, player.id)}>
                    Add to Team 1
                  </Button>
                </div>
                <div className="grid gap-1">
                  <Button onClick={() => handleAddPlayerToTeam(2, player.id)}>
                    Add to Team 2
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {availablePlayers.length > 0 && (
        <div className="flex justify-between w-full px-4 my-4">
          <Button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange("next")}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
      <div className="w-full mt-8">
        <TeamComponent teams={teams} setTeams={setTeams} />
      </div>
    </div>
  );
};

export default PlayersUI;
