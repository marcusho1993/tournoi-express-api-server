# Tournoi API Document

## Config

Port = 5000

## config file is not included in this repo. To access MongoDB, please add you own config file to the project.

## Dev instruction

1. Download the config zip file above and put the **config folder** into the project root. The file contains **MONGO_URI** and **jwtSecret** for development.
2. Once `npm install` the node modules, use `npm run server` to start the express api server locally
3. When generate the Angular project, named it **client** and put it into the project root
4. Add "proxy": "http://localhost:5000/" to the `package.json` at the **client** side if you are running both servers locally. If you are using the online api server then change the proxy link to the heroku URL
5. Use `npm run dev` to run both local backend and frontend servers concurrently
6. Or `cd client` into client side and use `ng server --open` to run the client side server solely when using online api server
7. Add the below scripts to package.json

```comment
    "client": "npm start --prefix client",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

## Remark: To get prettified json data, add ?pretty at the end of the apis

```comment
> http://localhost:5000/api/tournaments/active?pretty
```

## Public APIs

### Register API

```comment
@route     POST api/register
@desc      Register a user
@access    Public
@headers    { "Content-Type" : "application/json" }

> http://localhost:5000/api/register

@ body
{
  "username": "sarajane",
  "email": "sarajane@gmail.com",
  "password": "123456"
}

@return
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmQ3M2VhMTcyNDc0ZTY3YjU2YTNjOCIsImlhdCI6MTYwNjI1MTQ5OSwiZXhwIjoxNjA2NjExNDk5fQ.K64EAKmeSQIlaObEjGtANdvVDIDZWAyOE390dKvX-rw"
}
```

### Login API

```comment
@route     POST api/auth/login
@desc      Log in user
@access    Public
@headers    { "Content-Type" : "application/json" }

> http://localhost:5000/api/auth/login

@body
{
  "email": "jdoe@gmail.com",
  "password": "123456"
}

@return
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmQ3M2VhMTcyNDc0ZTY3YjU2YTNjOCIsImlhdCI6MTYwNjI1MTQ5OSwiZXhwIjoxNjA2NjExNDk5fQ.K64EAKmeSQIlaObEjGtANdvVDIDZWAyOE390dKvX-rw"
}
```

### Get all active tournaments API

```comment
@route     GET api/tournaments/active
@desc      Get all active tournaments
@access    Public
@headers    { "Content-Type" : "application/json" }

> http://localhost:5000/api/tournaments/active

@body
N/A

@return An array of active tournaments
```

### Get one tournament API

```comment
@route     GET api/tournaments/:tournamentID
@desc      Get one tournaments
@access    Public
@headers    { "Content-Type" : "application/json" }

> http://localhost:5000/api/tournaments/<tournamentID>

@body
N/A

@return A tournament that matches the tournamentID in the api
```

## Private APIs

### Get Logged in User API

```comment
@route     POST api/auth/user
@desc      Get Logged in user
@access    Private
@headers    { "x-auth-token" : "${ JsonToken }" }

> http://localhost:5000/api/auth/user

@body
N/A

@return
{
  "_id": "5fbd73ea172474e67b56a3c8",
  "username": "sarajane",
  "email": "sarajane@gmail.com",
  "date": "2020-11-24T20:58:19.000Z",
  "__v": 0
}
```

### Get user's tournaments API

```comment
@route     GET api/tournaments/ownedtournaments
@desc      Get one tournaments
@access    Public
@headers    { "x-auth-token" : "${ JsonToken }" }

> http://localhost:5000/api/tournaments/ownedtournaments

@body
N/A

@return A array of tournaments that matches the user's id and tournament's owner's userID. User's id is from the json token
```

### Create tournament API

```comment
@route     GET api/tournaments/add
@desc      Create tournament
@access    Private
@headers    { "x-auth-token" : "${ JsonToken }" }

> http://localhost:5000/api/tournaments/add

@body
{
  "title": "Animal Crossing",
  "description": "Lorem ipsum dolor sit amet consectetur adipisicing",
  "startDate": "2020/10/25",
  "player1": "player1",
  "player2": "player2",
  "player3": "player3",
  "player4": "player4",
  "player5": "player5",
  "player6": "player6",
  "player7": "player7",
  "player8": "player8"
}

@return {
    "isCompleted": false,
    "startDate": "2020-10-25T04:00:00.000Z",
    "_id": "5fbd8fb0b6ea69f42a6f26ae",
    "owner": {
        "userID": "5fbd7f50f48f03ea3f5190cf",
        "name": "tomT"
    },
    "title": "D&D",
    "description": "Sword & Shield",
    "players": [
        {
            "_id": "5fbd8fb0b6ea69f42a6f26af",
            "name": "player1",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b0",
            "name": "player2",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b1",
            "name": "player3",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b2",
            "name": "player4",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b3",
            "name": "player5",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b4",
            "name": "player6",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b5",
            "name": "player7",
            "placement": 4
        },
        {
            "_id": "5fbd8fb0b6ea69f42a6f26b6",
            "name": "player8",
            "placement": 4
        }
    ],
    "rounds": [
        {
            "isCompleted": false,
            "_id": "5fbd8fb0b6ea69f42a6f26b7",
            "roundNumber": 1,
            "bouts": [
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26b8",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26b9",
                            "name": "player1"
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26ba",
                            "name": "player2"
                        }
                    ]
                },
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26bb",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26bc",
                            "name": "player3"
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26bd",
                            "name": "player4"
                        }
                    ]
                },
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26be",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26bf",
                            "name": "player5"
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26c0",
                            "name": "player6"
                        }
                    ]
                },
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26c1",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26c2",
                            "name": "player7"
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26c3",
                            "name": "player8"
                        }
                    ]
                }
            ]
        },
        {
            "isCompleted": false,
            "_id": "5fbd8fb0b6ea69f42a6f26c4",
            "roundNumber": 2,
            "bouts": [
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26c5",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26c6",
                            "name": ""
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26c7",
                            "name": ""
                        }
                    ]
                },
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26c8",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26c9",
                            "name": ""
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26ca",
                            "name": ""
                        }
                    ]
                }
            ]
        },
        {
            "isCompleted": false,
            "_id": "5fbd8fb0b6ea69f42a6f26cb",
            "roundNumber": 3,
            "bouts": [
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26cc",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26cd",
                            "name": ""
                        },
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26ce",
                            "name": ""
                        }
                    ]
                }
            ]
        },
        {
            "isCompleted": false,
            "_id": "5fbd8fb0b6ea69f42a6f26cf",
            "roundNumber": 4,
            "bouts": [
                {
                    "isCompleted": false,
                    "_id": "5fbd8fb0b6ea69f42a6f26d0",
                    "boutPlayers": [
                        {
                            "won": false,
                            "_id": "5fbd8fb0b6ea69f42a6f26d1",
                            "name": ""
                        }
                    ]
                }
            ]
        }
    ],
    "isActive": true,
    "__v": 0
}
```

### Update tournament API

```comment
@route     GET api/tournaments/:tournamentID/update
@desc      Update tournament
@access    Private
@headers    { "x-auth-token" : "${ JsonToken }" }

> http://localhost:5000/api/tournaments/<tournamentID>/update

@body A tournament

@return The updated tournament
```

### Delete tournament API

```comment
@route     GET api/tournaments/:tournamentID/delete
@desc      Delete tournament
@access    Private
@headers    { "x-auth-token" : "${ JsonToken }" }

> http://localhost:5000/api/tournaments/<tournamentID>/delete

@body Tournament ID

@return msg: "Tournament deleted"
```
