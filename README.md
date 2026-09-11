# Tic-Tac-Toe

A responsive React Tic-Tac-Toe game. Choose a 3×3 through 9×9 board; a player wins by completing an entire row, column, or diagonal.

## Run locally

```sh
npm install
npm start
```

The development server is available at http://localhost:3000.

## Test and build

```sh
npm test -- --watchAll=false
npm run build
```

## Serve with nginx

The production image builds the React app and serves the static files through nginx.

```sh
docker build -t tic-tac-toe .
docker run --rm -p 8080:80 tic-tac-toe
```

Open http://localhost:8080.
