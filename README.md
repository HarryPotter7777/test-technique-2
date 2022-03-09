## Production
> For testing purpose, a database seeder is used to demonstrate the tool.
- Host address: localhost:80
- Client requests gets proxied to localhost:5500/api
```bash
    docker-compose up
```

## Developpment
- Host address: localhost:3000
```bash
    docker-compose -f docker-compose-dev.yml up
```

## End to end test
> Test server to run end to end tests.
```bash
    docker-compose -f docker-compose-test.yml up  --abort-on-container-exit --exit-code-from server_test
```

## Tech stack
- NodeJS & NestJS
- React & Redux
- Postgree
- MaterialUI
- Docker
- Jest

## Image update
- Developpment
```
    docker-compose -f docker-compose-dev.yml up --build
```

- Production
```
    docker-compose docker-compose.yml up --build
```