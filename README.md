# DetectPH node-api
DetectPH API features:
* Registering of devices as users
* Keeping record of user's proximity contacts
* Determining close contacts of users
* Notifying determined close contacts

## Prerequisites
* Node version 10 and above (NPM should be included)
* MongoDB
* Linux environment or terminal

## Getting Started
This should be done in a Linux environment or terminal. If you're not using Linux, update the preinstall and postinstall commands in package.json.

Here is a step by step instruction on how to run this API **locally**.

1) Clone this repository.
2) Install node modules in the src/ directory.

	```
	npm i
	```

3) Fill up the necessary information in .env.example file and save it as .env.

	1) Include a new variable *API_URL*. You will put your IP address or URL here for the app to connect to.
	
	2) *NODE_ENV* should be set to "test" when testing but not in production. 

	3) The *IOS_SECRET* and *ANDROID_SECRET* is for middleware/authenticator.js. You may create secrets or leave it as blank. Make sure to update the config of dotenv in index.js that there's a blank variable.

4) Update the server.js file to include API_URL.
	```
	const { API_URL, API_PORT } = process.env;

	const httpServer = server.listen(API_PORT, API_URL, () => {
		logger.info(`App running at ${API_URL}:${API_PORT}`);
	});
	```

5) Run the server while still in src/ directory.

	```
	npm start
	```

## Running the tests
### Run tests once

```
npm test
```

### Automatically run tests during code changes

```
npm run test:watch
```


## Built With
* [NodeJS](https://https://nodejs.org/)
* [ExpressJS](https://github.com/expressjs/express/)
* [MongoDB](https://www.mongodb.com/)

## Contact Us
Email us at [detectph.updsc@gmail.com](mailto:detectph.updsc@gmail.com).
You can also visit our [website](https://www.detectph.com) to know more about our app.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors
* **Patrick Buitre** - [Github](https://github.com/pats110217)
* **Angelique Rafael** - [Github](https://github.com/JelloJill)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

