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
                // Filtrar y mapear solo los jugadores que tienen imágenes no vacías
                const players = response.data.filter(player => player.player_image && player.player_image.trim() !== '')
                    .map(player => ({
                        id: player.player_id,
                        name: player.player_name,
                        image: player.player_image,

                    }));
                return players;
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