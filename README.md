# Hacktiv8 Overflow

Hacktiv8 Overflow apps is a simple overflow application like stackoverflow by fuadi naqi

### Routes

User :

| Route | HTTP | Description |
| ----- | ---- | ----------- |
| /users/signin | POST | login using email and password |
| /users/signup | POST | signup using field email, password |
| /users/profile | GET | Get profile data |

Question :

| Route | HTTP | Description |
| ----- | ---- | ----------- |
| /questions/ | GET | Get all questions in database (user login only) |
| /questions/profile | GET | Get all specifiec user questions in database by signin first (user login only) |
| /questions/add | POST | Create a new question (user login only) |
| /questions/vote | PUT | Update a question by sign the vote up or down (user login only) |
| /questions/:id | PUT | Update / edit an question (user login only) |
| /questions/:id | DELETE | Delete a specific question by params id (user login only) |

Answer :

| Route | HTTP | Description |
| ----- | ---- | ----------- |
| /answers/ | GET | Get all answers in  (user login only) |
| /answers/:questionId/:id | PUT | Update a vote up/down answer to a specific question (user login only) |
| /answers/:questionId | POST | Create an answer in specific question (user login only) |
| /answers/:id | DELETE | Delete a specific answer by params id (user login only) |

### Installation and Usage

Hacktiv8 Overflow requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd hacktiv8overflow/server
$ npm install
$ npm run dev
```

Install npm live-server globaly and start the client.

```sh
$ hacktiv8overflow/client
$ npm install
$ npm run dev
```

### Jsonwebtoken Key
You need to use your free permission jwt key for decode or sign jsonwebtoken by create .dotenv file and write 'SECRET_KEY=//yourkey//'

for example in your .dotenv file:
```sh
SECRET_KEY=123409253628
```
