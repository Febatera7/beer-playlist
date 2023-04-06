export interface AxiosGetPlaylistReturn {
    data: PlaylistsData,
}

interface PlaylistsData {
    playlists: Playlists
}

interface Playlists {
    items: PlaylistsItems[],
}

interface PlaylistsItems {
    name: string,
    tracks: PlaylistsItemsTracks,
}

interface PlaylistsItemsTracks {
    href: string,
}

export interface AxiosGetTracksReturn {
    data: TracksItems
}

interface TracksItems {
    items: Tracks[]
}

interface Tracks {
    track: Track
}

interface Track {
    name: string,
    href: string,
    artists: Artists[]
}

interface Artists {
    name: string,
}
