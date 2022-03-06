## Developpment
```bash
    docker-compose -f docker-compose-dev.yml up
```

## Production
```bash
    docker-compose up
```

## Stack technique
- NestJS
- React
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