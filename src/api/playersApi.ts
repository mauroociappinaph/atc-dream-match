// api/playersApi.js
import axiosClient from './axiosClient';

const playersApi = {
    async getPlayers(playerName = '') {
        try {
            console.log('Fetching players...');
            const response = await axiosClient.get('', {
                params: {
                    action: 'get_players',
                    player_name: playerName
                }
            });
            console.log('Players fetched successfully:', response.data);
            // Transforma los datos para asegurarte de que solo retornas lo necesario
            const players = Array.isArray(response.data) ? response.data.map(player => ({
                id: player.player_id,
                name: player.player_name,

            })) : [];
            return players;
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }
};

export default playersApi;
