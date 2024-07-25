# maticgasstation
sss
MaticGasStation Network is a REST API service that provides current gas price recommendations for Polygon PoS and Zkevm transactions. This service offers developers a convenient way to retrieve real-time gas prices and make informed decisions about transaction fees on the Polygon PoS and Zkevm network.

## Installation

```bash
$ git clone https://github.com/maticnetwork/
$ npm install
```

-   Prepare `.env` file & paste following content in .env.sample file into it. You may want to check [configuratoin](#configuration).

```bash
touch .env
```

Example

```
POS_RPC=<pos rpc url>
ZKEVM_RPC=<zkevm rpc url>
PORT=7000
SAFE=5
STANDARD=15
FAST=30
HISTORY_BLOCKS=15
```

-   Run service

```bash
npm start
```

-   Run tests

```bash
npm tests
```

---

### Dockerised Setup

Assuming you've docker set up & running,

-   Build docker image with tag mgs

```bash
# all commands executed at root of project

docker build . -t mgs
```

-   Run docker image at port 7000 and name the container

```bash
docker run -p 7000 -d --name matic_gas_station mgs
```

-   Check docker container running

```bash
docker ps
```

-   Check log

```bash
docker logs -f matic_gas_station
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

---

## Usage

### PoS v1

**Request**

```bash
curl -s localhost:7000/pos/v1
```

**Response**

```js
{
	"success": true,
	"data": {
		"safeLow": 129.47556613,
		"standard": 129.47556613,
		"fast": 129.47556613,
		"blockTime": 2,
		"blockNumber": 45068237
	}
}
```

### PoS v2

**Request**

```bash
curl -s localhost:7000/pos

(or)

curl -s localhost:7000/pos/v2
```

**Response**

```js
{
	"success": true,
	"data": {
		"safeLow": {
			"maxPriorityFee": 30,
			"maxFee": 189.831563019
		},
		"standard": {
			"maxPriorityFee": 30,
			"maxFee": 189.831563019
		},
		"fast": {
			"maxPriorityFee": 31.931367927,
			"maxFee": 191.762930946
		},
		"estimatedBaseFee": 159.831563019,
		"blockTime": 2,
		"blockNumber": 45068158
	}
}
```

### Zkevm

**Request**

```bash
curl -s localhost:7000/zkevm
```

**Response**

```js
{
	"success": true,
	"data": {
		"safeLow": 1.04,
		"standard": 1.04,
		"fast": 1.04,
		"blockTime": 1.5,
		"blockNumber": 2526102
	}
}
```

## Interpretation

### Configuration

| Field           | Interpretation                                                      |
| --------------- | ------------------------------------------------------------------- |
| Safe            | Minimum gas price at which **X** % of last **N** tx(s) got accepted |
| Standard        | Average gas price at which **X** % of last **N** tx(s) got accepted |
| Fast            | Highest gas price at which **X** % of last **N** tx(s) got accepted |
| POS_RPC         | PoS node's endpoint                                                 |
| ZKEVM_PRC       | Zkevm node's endpoint                                               |
| Port            | Accept connections on port                                          |
| HistoryOfBlocks | The last N history of blocks                                        |

### Response

| Field       | Interpretation                                               |
| ----------- | ------------------------------------------------------------ |
| SafeLow     | Lowest possible recommended gas price                        |
| Standard    | Average gas price seen **( Recommended )**                   |
| Fast        | Tx should be included in ~30 sec                             |
| BlockTime   | Observed delay between two recently mined consequtive blocks |
| BlockNumber | Latest considered block in recommendation                    |

> Note: All gas prices in `Gwei`

## Support

Our [Discord](https://discord.gg/0xPolygonDevs) is the best way to reach us ✨.

## Contributing

You are very welcome to contribute, please see contributing guidelines - [[Contribute](./CONTRIBUTING.md)].

Thank you to all the people who already contributed to maticgasstation!

<a href="https://github.com/maticnetwork/maticgasstation/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maticnetwork/maticgasstation" />
</a>

Made with [contributors-img](https://contrib.rocks).

## License

[MIT](./LICENSE)
