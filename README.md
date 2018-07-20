# Crypto Pagos

Simple SPA that communicates with a express server instance to process BTC and LTC payments. To use simply specify the `REACT_APP_API_URL` environment variable to point to your own nodejs back-end that should then handle the communications with the BTC Pay Server instance.

Conversion rates are fetched using [Cryptonator Public API](https://es.cryptonator.com/api).

## Dependencies:

- React: 16.4.1
- Material UI: 1.4
- Axios: 0.18
- React Number Format: 3.5
- React App Env: 1.2.2