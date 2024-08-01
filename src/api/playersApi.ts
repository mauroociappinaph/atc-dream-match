import axiosClient from './axiosClient';

const playersApi = {
    async getPlayers(playerName = '') {
        try {
            const response = await axiosClient.get('', {
                params: {
                    action: 'get_players',
                    player_name: playerName
                }
            });
            if (Array.isArray(response.data)) {
                const uniquePlayers = new Map();
                response.data.forEach(player => {
                    if (player.player_image && player.player_image.trim() !== '' && !uniquePlayers.has(player.player_id)) {
                        uniquePlayers.set(player.player_id, {
                            id: player.player_id,
                            name: player.player_name,
                            image: player.player_image,
                            country: player.player_country || "Unknown",
                            position: player.player_type,
                            team: player.team_name
                        });
                    }
                });
                return Array.from(uniquePlayers.values());
            } else {
                console.log('No players data found');
                return [];

            }
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }
};

export default playersApi;