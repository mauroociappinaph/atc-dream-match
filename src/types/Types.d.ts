// types/Types.ts
export interface Player {
    id: number;
    name: string;
    image: string;
    position?: string;
    team?: string;
}

export interface Team {
    id: number;
    name: string;
    players: Player[];
}

export interface TeamComponents {
    id: number;
    name: string;

}


export interface PlayersUIProps {
    teams: Team[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    availablePlayers: Player[];
    loading: boolean;
    error: string;
    currentPage: number;
    playersPerPage: number;
    handleAddPlayerToTeam: (teamId: number, playerId: number) => void;
    handlePageChange: (direction: "next" | "prev") => void;
}

export interface ButtonProps {
    children?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}


interface TeamComponentProps {
    teams: Team[];
}