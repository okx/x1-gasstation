# maticgasstation

Gas Price Recommender for Matic Network

## Deployment

-   Make sure you've `npm`, `nodejs` & `make` installed
-   Prepare `.env` file & paste following content into it. You may want to [check](#configuration)

```bash
pushd mgs
touch .env
```

> Note: For `RPC` field, use websocket endpoint of Bor Node

```
SAFELOW=30
STANDARD=60
FAST=90
FASTEST=100
POS_RPC=wss://<domain>
BUFFERSIZE=500
HOST=0.0.0.0
PORT=7000
```

-   Install dependencies

```bash
popd
make install
```

-   Run service

```bash
make run
```

---

### Dockerised Setup

Assuming you've docker daemon up & running,

-   Build docker image

```bash
# all commands executed at root of project

make build_docker
```

-   Create `.env` file at root of project
-   Run docker container

```bash
# exposes port 7000 on HOST,
# while expecting PORT field
# was untouched in .env

make run_docker
```

-   Check docker container running

```bash
docker ps
```

-   Check log

```bash
docker logs matic_gas_station -f # while following
```

-   Stop container

```bash
docker stop matic_gas_station
```

-   Restart container

```bash
docker restart matic_gas_station
```

-   Remove container

```bash
docker rm matic_gas_station
```

-   Remove image

```bash
docker rmi -f matic_gas_station
```

> Note: Log rotation is enabled, max log file size 8MB, max log file count 4. For changing this see `Makefile`.

## Usage

Send HTTP GET request

```bash
curl -s localhost:7000 | jq
```

You'll receive

```json
{
    "safeLow": 2,
    "standard": 3.020000001,
    "fast": 5,
    "fastest": 3870.208681652,
    "blockTime": 2,
    "blockNumber": 15854458
}
```

## Interpretation

### Configuration

| Field      | Interpretation                                                      |
| ---------- | ------------------------------------------------------------------- |
| SafeLow    | Minimum gas price at which **X** % of last **N** tx(s) got accepted |
| Standard   | -- do --                                                            |
| Fast       | -- do --                                                            |
| Fastest    | -- do --                                                            |
| POS_RPC    | Bor node's websocket endpoint URL                                   |
| BufferSize | Last N tx(s) considered when recommending                           |
| Host       | Run HTTP server on interface address                                |
| Port       | Accept connections on port                                          |

### Response

| Field       | Interpretation                                               |
| ----------- | ------------------------------------------------------------ |
| SafeLow     | Lowest possible recommended gas price                        |
| Standard    | Average gas price seen **( Recommended )**                   |
| Fast        | Tx should be included in ~30 sec                             |
| Fastest     | Targeted towards traders, super fast inclusion possibility   |
| BlockTime   | Observed delay between two recently mined consequtive blocks |
| BlockNumber | Latest considered block in recommendation                    |

> Note: All gas prices in `Gwei`
