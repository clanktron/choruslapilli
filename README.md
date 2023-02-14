# Chorus Lapilli

A simple twist on tictactoe. After each placing three pieces players must move their pieces
to any adjacent squares in an attempt to get three in a row. If a player has a piece in the center square
they must either vacate the square or win on the following turn.

>Built with Nodejs and React

For local testing:

```bash
$ git clone https://github.com/clanktron/choruslapilli
$ cd choruslapilli
# Docker
$ docker build -t choruslapilli .
$ docker run -p 3000:3000 choruslapilli
# NPM
$ npm install
$ npm start
```

