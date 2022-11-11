# Arena Technical Test

## How to Use

### Requirements

- [Node.js](https://nodejs.org/en/) (v18.12.0 - LTS)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) (v1.22.19)

### Installation

1. Clone the repository.
2. Install dependencies with `yarn install`.
3. Create a `.env` file in the root directory and add the following environment variables:

```text
ETHERSCAN_API_KEY=<YOUR_ETHERSCAN_API_KEY>
```

### Usage

1. Run `yarn test` to verify that setup went smoothly.
2. Run `yarn dev` or `yarn devstart` to start the application.
3. Open Postman or Thunder Client and setup a post request to `http://localhost:8080/` with the following body:

```json
{
  "wallet_address": "0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb",
  "contract_address": "0x8ff1523091c9517bc328223d50b52ef450200339"
}
```
