// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { description, name, version } from "../../../package.json";
const { APP_VERSION, PORT } = process.env;

export default {
  "swagger": "2.0",
  "info": {
    "title": `${name}`,
    "version": `${version}`,
    "description": `${description}`
  },
  "host": `localhost:${PORT}`,
  "basePath": `/${APP_VERSION}`,
  "tags": [
    {
      "name": "Beers",
      "description": "Create, read, update and delete beers data"
    },
    {
      "name": "Playlists",
      "description": "Receive a beer temperature and choose the best playlist on Spotify and the best beer style."
    }
  ],
  "schemes": [
    "http",
    "https"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/beers": {
      "get": {
        "tags": [
          "Beers"
        ],
        "description": "Get beers data",
        "responses": {
          "200": {
            "description": "Ok"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      },
      "post": {
        "tags": [
          "Beers"
        ],
        "description": "Save beers data",
        "parameters": [
          {
            "name": "Body",
            "in": "body",
            "schema": {
              "type": "object",
              "required": [
                "beerStyle",
                "minTemperature",
                "maxTemperature",
              ],
              "properties": {
                "beerStyle": {
                  "type": "string"
                },
                "minTemperature": {
                  "type": "number"
                },
                "maxTemperature": {
                  "type": "number",
                },
              }
            }
          },
        ],
        "responses": {
          "201": {
            "description": "Ok"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      },
    },
    "/beers/{beerId}": {
      "patch": {
        "tags": [
          "Beers"
        ],
        "description": "Update beers data",
        "parameters": [
          {
            "in": "path",
            "name": "beerId",
            "required": true,
            "type": "string",
            "description": "ID of save data beer on database"
          },
          {
            "name": "Body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "beerStyle": {
                  "type": "string"
                },
                "minTemperature": {
                  "type": "number"
                },
                "maxTemperature": {
                  "type": "number",
                },
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Ok"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      },
      "delete": {
        "tags": [
          "Beers"
        ],
        "description": "Delete beers data",
        "parameters": [
          {
            "in": "path",
            "name": "beerId",
            "required": true,
            "type": "string",
            "description": "ID of save data beer on database"
          },
        ],
        "responses": {
          "200": {
            "description": "Ok"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/playlists/{temperature}": {
      "get": {
        "tags": [
          "Playlists"
        ],
        "description": "Get the right beer style and playlist for a received temperature",
        "parameters": [
          {
            "in": "path",
            "name": "temperature",
            "required": true,
            "type": "integer",
            "description": "Temperature choosed to receive a beer style and a Spotify playlist"
          },
        ],
        "responses": {
          "200": {
            "description": "Ok"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    }
  }
};