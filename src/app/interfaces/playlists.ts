export interface ApiTokenSpotifyReturn {
    access_token: string,
    token_type: string,
    expires_in: number,
}

export interface BeerMediumTemperatureParse {
    beerStyle: string,
    mediumTemperature: number,
}

export interface PlaylistsReturn {
    beerStyle: string,
    playlist: Playlist,
}

interface Playlist {
    name: string,
    tracks: TracksParse[],
}

export interface TracksParse {
    name: string,
    artist: string,
    link: string,
}
