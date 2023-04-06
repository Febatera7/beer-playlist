# Beer Playlist 🍺

In this app, you can save data such as beer style, ideal minimum temperature and ideal maximum temperature, about the beer styles you prefer, and then pass the temperature at which you intend to drink your beer and the app will choose the most suitable playlist on Spotify.

While there is documentation with Swagger going to **http://localhost:{PORT}/{APP_VERSION}/docs**, below are some examples of how to do this. In this example, we will use port **8550**. Remember that when downloading, you will need to create your own environment variables, with the example in the _.env.sample_ file.

> For the _GET_ method **{APP_VERSION}/beers**, no parameter is needed, so it will not be exemplified.
### Get Playlist

Just pass the temperature via path params and let the app do the rest, like example below.


```
curl --location 'http://localhost:8550/v1/playlists/4'
```

And then

```
{
    "beerStyle": "Imperial Stouts",
    "playlist": {
        "name": "Imperial Stouts 🍺",
        "tracks": [
            {
                "name": "Hurricane",
                "artist": "Luke Combs",
                "link": "https://api.spotify.com/v1/tracks/6xHI9KjUjYT0FPtGO8Mxa1"
            },
            {
                "name": "She Got the Best of Me",
                "artist": "Luke Combs",
                "link": "https://api.spotify.com/v1/tracks/698eQRku24PIYPQPHItKlA"
            },
            {
                "name": "Beautiful Crazy",
                "artist": "Luke Combs",
                "link": "https://api.spotify.com/v1/tracks/2rxQMGVafnNaRaXlRMWPde"
            },
            ...
        ]
    }
}
```

### Create Beer

To create a new beer data, you need to make a **POST** method call to _{API_VERSION}/beers_ , as in the example below.
>If you try to save two beers of the same style, it will check that a save already exists and will not allow you to save with the same name.
```
curl --location 'http://localhost:8550/v1/beers' \
--header 'Content-Type: application/json' \
--data '{
    "beerStyle": "Example Beer",
    "minTemperature": -1,
    "maxTemperature": 1
}'
```

Response:

```
{ 
    message: "Beer Example Beer succesfully created."
};
```

### Update Beer

To update a beer data, you need to make a **PATCH** method call to _{API_VERSION}/beers/{beerId}_ , as in the example below.
>This method accepts that you pass only the parameters you want to change, ignoring what you intend to leave as it is. It also won't allow you to change the beer style to one that already exists.

```
curl --location --request PATCH 'http://localhost:8550/v1/beers/68162261-c1a8-4292-9122-a3d7935ac5d0' \
--header 'Content-Type: application/json' \
--data '{
    "beerStyle": "Example Beer Update",
    "minTemperature": -5
}'
```

Response:

```
{
    "message": "Beer succesfully updated."
}
```

### Delete Beer

To delete a beer data, you need to make a **DELTE** method call to _{API_VERSION}/beers/{beerId}_ , as in the example below.

```
curl --location --request DELETE 'http://localhost:8550/v1/beers/68162261-c1a8-4292-9122-a3d7935ac5d0'
```

Response:

```
{
    "message": "Beer succesfully deleted."
}
```

>>> To facilitate use, some styles are pre-saved in the database, they are: Weissbier, Pilsens, Weizenbier, Red ale, India pale ale, IPA, Dunkel, Imperial Stouts and Brown ale.
