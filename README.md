# letsvote

## Build the project

1. Install Docker CE
2. Run the following commands (in sudo mode)

    ```bash
    docker compose build
    docker compose up -d
    docker exec -it backend /bin/bash
    ```

    wait few secs to let the db start and then:

    ```bash
    npm run prisma
    exit
    ```

## docs

## test

if you run locally

-   [frontend tests](./frontend/coverage/lcov-report/index.html)
-   [backend tests](./backend/coverage/lcov-report/index.html)
