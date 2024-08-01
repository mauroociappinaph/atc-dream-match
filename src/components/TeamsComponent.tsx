// src/components/TeamComponent.tsx
import React from "react";
import { TeamComponentProps } from "@/types/Types";

const TeamComponent: React.FC<TeamComponentProps> = ({ teams }) => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Los Campeones</h1>
          <p className="text-muted-foreground">Equipo de Fútbol 5</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-card p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {team.name}
                </h3>
                <ul className="list-none space-y-4">
                  {team.players.map((player) => (
                    <li
                      key={player.id}
                      className="flex items-center space-x-4 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-full object-cover"
                          src={player.image}
                          alt={player.name}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{player.name}</h3>
                        <p className="text-muted-foreground">
                          {player.position}
                        </p>
                      </div>
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
