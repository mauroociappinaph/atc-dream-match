// src/components/TeamComponent.tsx
import React, { useState } from "react";
import { TeamComponentProps } from "@/types/Types";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TeamComponent: React.FC<TeamComponentProps> = ({ teams, setTeams }) => {
  const [editTeamId, setEditTeamId] = useState<number | null>(null);
  const [editTeamName, setEditTeamName] = useState<string>("");

  const handleEditTeamName = (teamId: number) => {
    setEditTeamId(teamId);
    const team = teams.find((team) => team.id === teamId);
    if (team) setEditTeamName(team.name);
  };

  const handleSaveTeamName = (teamId: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, name: editTeamName } : team
      )
    );
    setEditTeamId(null);
    setEditTeamName("");
  };

  const handleDeletePlayer = (teamId: number, playerId: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? { ...team, players: team.players.filter((p) => p.id !== playerId) }
          : team
      )
    );
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Crear Equipos</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-card p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  {editTeamId === team.id ? (
                    <>
                      <input
                        type="text"
                        value={editTeamName}
                        onChange={(e) => setEditTeamName(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        onClick={() => handleSaveTeamName(team.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                        {team.name}
                      </h3>
                      <FiEdit
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={() => handleEditTeamName(team.id)}
                      />
                    </>
                  )}
                </div>
                <ul className="list-none space-y-4">
                  {team.players.map((player) => (
                    <li
                      key={player.id}
                      className="flex items-center justify-between space-x-4 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={player.image}
                            alt={player.name}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {player.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {player.position}
                          </p>
                        </div>
                      </div>
                      <FiTrash2
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDeletePlayer(team.id, player.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
