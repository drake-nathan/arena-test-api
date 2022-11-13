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
4. Else, use your client of choice and point to `http://localhost:8080/`.

### Routes

- `GET /` - Returns `hello world`.
- `POST /api/latest-tx` - Returns a list of transactions for a given address.

```json
{
  "wallet_address": "0x56ee8bd11b5a385d3d533b4c2c6e37de78b2aafb",
  "contract_address": "0x8ff1523091c9517bc328223d50b52ef450200339"
}
```
