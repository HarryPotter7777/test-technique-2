## Developpment
```bash
    docker-compose -f docker-compose-dev.yml up
```

## End to end test
```bash
    docker-compose -f docker-compose-test.yml up  --abort-on-container-exit --exit-code-from server_test
```

## Production
```bash
    docker-compose up
```

## Stack technique
- NestJS
- React & Redux
- Postgree

## Image update

- Dev
```
    docker-compose -f docker-compose-dev.yml up --build
```

- Prod
```
    docker-compose docker-compose.yml up --build
```