# devRant Lite

Tiny, fully-featured REST client for the [unofficial devRant API](https://devrantapi.docs.apiary.io/).

[![npm](https://img.shields.io/npm/v/devrant-lite.svg)](https://npm.im/devrant-lite) [![Node CI](https://github.com/Skayo/devrant-lite/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Skayo/devrant-lite/actions/workflows/nodejs.yml)

## Features

- Promise driven via Async / Await
- [Typescript support](https://github.com/Skayo/devrant-lite/blob/main/index.d.ts)
- Works both in Node and in browsers
- Under 1kb
- Minimal dependencies
- Test suite

## Why another devRant API client?

I have built this library because existing ones [have not been recently maintained](https://github.com/leahlundqvist/RantScript/),
or don't support all existing endpoints.

## Installation

```sh
yarn add devrant-lite
```
or
```sh
npm install devrant-lite
```

Then you can include the following at the top of your code:

```javascript
import DevRant from 'devrant-lite';

const client = DevRant.withCredentials('username', 'password');

client.get(...)
client.post(...)
```

## Usage

### Authentication

You will need to create an account on [https://devrant.com/](https://devrant.com), if you haven't already.
Otherwise, you will only have access to some public endpoints, like `devrant/rants`.

There are three ways of authentication:

1. **No Authentication**:
   ```javascript
   const client = new DevRant();
   
   const { rants } = await client.get('devrant/rants');
   ```

2. **With User Credentials**:
   > I recommend grabbing the auth token with the `.getAuthToken()` method afterwards and using the `.withAuthToken()` method next time.
   ```javascript
   const client = DevRant.withCredentials('username', 'password');
   
   const { data } = await client.get('users/me/notif-feed', {
     last_time: 0
   });
   ```

3. **With Auth Token**:
   ```javascript
   const client = DevRant.withAuthToken({
     key: '123abcdefghijklmnopqrstuvxyz',
     id: 12345678,
     user_id: 12345 
   });
   
   const { data } = await client.get('users/me/notif-feed', {
     last_time: 0
   });
   ```

## Methods

### `new DevRant(options)`

The constructor accepts an `options` object with the following options:

##### `options.baseUrl`

Sets the base url for the api.
Useful for proxying or testing.
Default: `'https://devrant.com/api'`

##### `options.app`

Sets the app ID to use.
The app id will be sent with every request.
Default: `3`

##### `options.plat`

Similar as the app ID, this sets the platform ID,
which will also be sent with every request.
Default: `3`

### `DevRant.withCredentials(username, password, options)`

A helper function which creates a new instance of the `DevRant` class and then sends a request to the `users/auth-token` endpoint to get an auth token.
When the request was successful it sets the auth token with the `setAuthToken(auth_token)` method.

### `DevRant.withAuthToken(auth_token, options)`

A helper function which creates a new instance of the `DevRant` class and then sets the auth token with the `setAuthToken(auth_token)` method.

### `client.get(endpoint, parameters)`

Use the `post` method for actions that get state.
Returns a Promise resolving to the API response object, or rejecting on error.
The response and error objects will also have a **hidden** `headers` property with the HTTP response headers returned by
the devRant API.

```javascript
const client = DevRant.withCredentials('username', 'password');

// Get todays top rants
const { rants } = await client.get("devrant/rants", {
	sort:  'top',
	range: 'day',
	limit: 20,
	skip:  0,
});
```

### `client.post(endpoint, parameters)`

Same return as `get()`.

Use the `post` method for actions that change or create state.
For example, to post a new rant:

```javascript
const client = DevRant.withCredentials('username', 'password');

// Post a rant with text "Hello World!"
await client.post('devrant/rants', {
	rant: 'Hello World!',
	tags: 'hello, world',
	type: 6
});
```

### `client.delete(endpoint, query_parameters)`

Same return as `get()` and `post()`.

Use the `delete()` method for actions that delete state. For example, to delete a rant:

```javascript
const client = DevRant.withCredentials('username', 'password');

// Delete rant with ID 12345
await client.delete('devrant/rants/12345');
```

### `client.setAuthToken(auth_token)`

Sets the auth token to be used for authentication. An auth token object consists of the `id`, `key` and `user_id` properties.

### `client.getAuthToken()`

Returns the auth token used for authentication.

## Examples

You can find many more examples for various resources/endpoints in [the tests](test).

## Troubleshooting

### Headers on success

```javascript
const response = await client.get('devrant/rants');
console.log(`Content Length: ${response.headers.get('Content-Type')}`);
console.log(response.rants[0]);
```

### API errors

`.get()`, `.post()` and `.delete()` reject on error, so you can use try/catch to handle errors. The error object contains an `error` property with the error message and the default `success` property,
which is `false`, in this case. The error object will also have a **hidden** `headers` property with the HTTP response headers returned by the devRant API.

```javascript
try {
	const response = await client.get("some/endpoint");
	// ... use response here ...
} catch (e) {
	if ('success' in e) {
		// devRant API error
		console.error(e.error);
	} else {
		// non-API error, e.g. network problem or invalid JSON in response
	}
}
```

## Contributing

1. Fork/clone the repo
2. Run `yarn/npm install`
3. Place your credentials in a [.env](https://www.npmjs.com/package/dotenv) file in the project's root directory, under the following variables:
   ```dotenv
   DEVRANT_USERNAME=...
   DEVRANT_PASSWORD=...
   ```
4. Run `yarn/npm test` and make sure all tests pass
5. Make sure all tests pass. **NOTE: tests will take over 10 minutes to finish.**
6. Commit using a [descriptive message](https://chris.beams.io/posts/git-commit/) (please squash commits into one per fix/improvement!)
7. Run `git push` and submit your PR!

## Credits

Authors:

- [@Skayo](https://github.com/Skayo)
