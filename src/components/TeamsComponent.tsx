// components/TeamComponent.tsx
import React, { useState } from "react";

interface Team {
  id: number;
  name: string;
}

const TeamComponent: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [editMode, setEditMode] = useState<{ id: number | null; name: string }>(
    { id: null, name: "" }
  );

  const handleAddTeam = () => {
    if (teams.length < 2 && newTeamName.trim()) {
      const newTeam = { id: Date.now(), name: newTeamName };
      setTeams([...teams, newTeam]);
      setNewTeamName("");
    }
  };

  const handleEditTeam = (id: number) => {
    const teamToEdit = teams.find((team) => team.id === id);
    if (teamToEdit) {
      setEditMode({ id: teamToEdit.id, name: teamToEdit.name });
    }
  };

  const handleUpdateTeam = () => {
    setTeams(
      teams.map((team) =>
        team.id === editMode.id ? { ...team, name: editMode.name } : team
      )
    );
    setEditMode({ id: null, name: "" });
  };

  const handleDeleteTeam = (id: number) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Team Manager</h1>
      {teams.map((team) => (
        <div key={team.id} className="mb-4 p-4 border rounded-lg shadow-sm">
          {editMode.id === team.id ? (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                value={editMode.name}
                onChange={(e) =>
                  setEditMode({ ...editMode, name: e.target.value })
                }
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpdateTeam}
              >
                Update
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-lg">{team.name}</span>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleEditTeam(team.id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {teams.length < 2 && (
        <div className="mt-5 flex space-x-3">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="Enter team name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleAddTeam}
          >
            Add Team
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamComponent;
