import { 
    ApiTokenSpotifyReturn, 
    BeerMediumTemperatureParse, 
    PlaylistsReturn, 
    TracksParse 
} from "../interfaces/playlists";
import { AxiosGetPlaylistReturn, AxiosGetTracksReturn } from "../interfaces/spotify";
import { AxiosConfig } from "../interfaces/config";
import { Beers } from "../../database/entities/beers";
import axios from "axios";
import cache from "memory-cache";
import spotifyConfig from "../config/spotify";

const getPlaylistByTemperatureService = async (temperature: number, beers: Beers[]): Promise<PlaylistsReturn> => {
    try {
        const { searchApiUrl } = spotifyConfig;

        let spotifyToken = cache.get("token");

        if (!spotifyToken) {
            const getSpotifyToken = await getSpotifyTokenService();

            cache.put("token", getSpotifyToken.access_token, getSpotifyToken.expires_in);

            spotifyToken = cache.get("token");
        }

        const mediumTemperatureBeers: BeerMediumTemperatureParse[] = beers.map(beer => {
            return {
                beerStyle: beer.beerStyle,
                mediumTemperature: (beer.minTemperature + beer.maxTemperature) / 2
            };
        });

        const sortMediumTemperatureBeers: BeerMediumTemperatureParse[] = mediumTemperatureBeers.sort((a, b) => {
            const beerStyleA = a.beerStyle.toLowerCase();
            const beerStyleB = b.beerStyle.toLowerCase();

            if (beerStyleA > beerStyleB) return 1;
            if (beerStyleA < beerStyleB) return -1;
            return 0;
        });

        const closest: BeerMediumTemperatureParse = sortMediumTemperatureBeers.reduce((previous, current) => {
            return (Math.abs(current.mediumTemperature - temperature)
                < Math.abs(previous.mediumTemperature - temperature)
                ? current
                : previous);
        });

        const config: AxiosConfig = {
            headers: {
                Authorization: `Bearer ${spotifyToken}`,
            },
        };

        const getPlaylist: AxiosGetPlaylistReturn = await axios.get(
            `${searchApiUrl}q=${closest.beerStyle}&type=playlist&limit=1&market=BR`,
            config
        );

        const getTracks: AxiosGetTracksReturn = await axios.get(
            `${getPlaylist.data.playlists.items[0].tracks.href}`,
            config
        );

        const tracksParse: TracksParse[] = getTracks.data.items.map(item => {
            return {
                name: item.track.name,
                artist: item.track.artists[0].name,
                link: item.track.href
            };
        });

        const response: PlaylistsReturn = {
            beerStyle: closest.beerStyle,
            playlist: {
                name: getPlaylist.data.playlists.items[0].name,
                tracks: tracksParse
            }
        };

        return response;
    } catch (error) {
        return error;
    }
};

const getSpotifyTokenService = async (): Promise<ApiTokenSpotifyReturn> => {
    try {
        const { tokenApiFormUrl, tokenApiUrl } = spotifyConfig;

        const config: AxiosConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        const getToken = await axios.post(tokenApiUrl, tokenApiFormUrl, config);

        return getToken.data;
    } catch (error) {
        return error;
    }
};


export default {
    getPlaylistByTemperatureService
};
