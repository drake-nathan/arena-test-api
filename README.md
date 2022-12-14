# Arena Technical Test

## How to Use

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

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
3. If you have Thunder Client installed in VS Code, I have routes preset in `/thunder-tests`. You can import them and run them to test the application.
4. Else, use your client of choice and point to `http://localhost:8080/` (replace `8080` with selected port, if defined).

### Routes

- `GET /` - Returns `hello world`.
- `POST /api/latest-tx` - Returns the latest transaction for a given wallet on a given contract. Example body:

```json
{
  "wallet_address": "0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb",
  "contract_address": "0x8ff1523091c9517bc328223d50b52ef450200339"
}
```

- `POST /api/most-used-contract` - Returns the most used contract for a given wallet. Example body:

```json
{
  "wallet_address": "0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb"
}
```

- `POST /api/most-tx` - Given a list of wallets and a contract, returns the tx count for each wallet on that contract, sorted by transactions count. Example body:

```json
{
  "contract_address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "wallets": [
    "0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb",
    "0xdcae87821fa6caea05dbc2811126f4bc7ff73bd1",
    "0xd2a3f9C6FBE4C13D979898e603D64561264a6B35",
    "0x8b90eb28dd723fd07f31d1a6c867dcca00f10f1f"
  ]
}
```
