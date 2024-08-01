"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
} from "@/components/ui/dialog";

export function Teams() {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team A",
      players: [
        { id: 1, name: "Player 1", position: "Forward" },
        { id: 2, name: "Player 2", position: "Midfielder" },
        { id: 3, name: "Player 3", position: "Defender" },
        { id: 4, name: "Player 4", position: "Goalkeeper" },
        { id: 5, name: "Player 5", position: "Forward" },
      ],
    },
    {
      id: 2,
      name: "Team B",
      players: [
        { id: 6, name: "Player 6", position: "Midfielder" },
        { id: 7, name: "Player 7", position: "Defender" },
        { id: 8, name: "Player 8", position: "Goalkeeper" },
        { id: 9, name: "Player 9", position: "Forward" },
        { id: 10, name: "Player 10", position: "Midfielder" },
      ],
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([
    { id: 11, name: "Player 11", position: "Defender" },
    { id: 12, name: "Player 12", position: "Midfielder" },
    { id: 13, name: "Player 13", position: "Forward" },
    { id: 14, name: "Player 14", position: "Goalkeeper" },
    { id: 15, name: "Player 15", position: "Defender" },
  ]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const handleAddPlayer = (teamId, player) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId
          ? { ...team, players: [...team.players, player] }
          : team
      )
    );
  };
  const handleRemovePlayer = (teamId, playerId) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              players: team.players.filter((player) => player.id !== playerId),
            }
          : team
      )
    );
    setShowDeleteConfirmation(false);
  };
  const handleEditPlayer = (teamId, playerId, updatedPlayer) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              players: team.players.map((player) =>
                player.id === playerId ? updatedPlayer : player
              ),
            }
          : team
      )
    );
    setShowEditConfirmation(false);
  };
  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter((team) => team.id !== teamId));
    setShowDeleteConfirmation(false);
  };
  const handleEditTeam = (teamId, updatedTeam) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, name: updatedTeam.name } : team
      )
    );
    setShowEditConfirmation(false);
  };
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Football Teams</h1>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button
            onClick={() =>
              handleAddPlayer(
                teams[0].id,
                availablePlayers.find((player) => player.id === 11)
              )
            }
          >
            Add Player
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {teams.map((team) => (
          <Card key={team.id} className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{team.name}</h2>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  onClick={() => setShowEditConfirmation(true)}
                >
                  Edit Team
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete Team
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {team.players.map((player) => (
                <div
                  key={player.id}
                  className="bg-muted p-4 rounded-md flex flex-col sm:flex-row justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold">{player.name}</h3>
                    <p className="text-muted-foreground">{player.position}</p>
                  </div>
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button
                      variant="outline"
                      onClick={() => setShowEditConfirmation(true)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirmation(true)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      {showDeleteConfirmation && (
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleDeleteTeam(teams[0].id)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showEditConfirmation && (
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription>
                Update the team name and save changes.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Input
                defaultValue={teams[0].name}
                onChange={(e) =>
                  handleEditTeam(teams[0].id, { name: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setShowEditConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleEditTeam(teams[0].id, { name: "New Team Name" })
                }
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
