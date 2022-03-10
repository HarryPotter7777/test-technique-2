## Setup
```bash
git clone https://github.com/HarryPotter7777/test-technique-2
cd test-technique-2 && docker-compose up
```

## Production
> For testing purpose, a database seeder is used to demonstrate the tool.
- Host address: localhost (port 80)
- Client requests gets proxied to localhost:5500
```bash
    docker-compose up
```

## Developpment
- Host address: localhost:3000
```bash
    docker-compose -f docker-compose-dev.yml up
```

## Unit test
- Server
```
cd server && npm run test
```

## End to end test
- Server
> Start a test server and run end to end tests.
```bash
    cd server
    docker-compose -f docker-compose-test.yml up  --abort-on-container-exit --exit-code-from server_test
```

- Client
> Start a dev server and run cypress end to end tests.
```bash
    docker-compose -f docker-compose-dev.yml up
    cd client
    npm run e2e-test
```

## Tech stack
- NodeJS & NestJS
- React & Redux
- Postgree
- Docker
- Cypress
- Jest
- MaterialUI

## Image update
- Developpment
```
    docker-compose -f docker-compose-dev.yml up --build
```

- Production
```
    docker-compose docker-compose.yml up --build
```

- Test
```
    docker-compose docker-compose-test.yml up --build
```