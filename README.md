# TracePH

TracePH API using NodeJS, Express MongoDB
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node version 10 and above

MongoDB running in local

### Installing

A step by step series of examples that tell you how to get a development env running

Install node modules

```
npm i
```

### Deploying locally

```
cd src && npm start
```

### Deploying via Docker
Build the docker image

```
docker build -t trace-ph:{semver} .
```

The create the container

```
docker run --name={identifier} -d -p 80:{port to access locally} trace-ph:{semver}
```

## Running the tests

Coming soon™

## Deployment

Coming soon.

## Built With

* [NodeJS](https://https://nodejs.org/)
* [ExpressJS](https://github.com/expressjs/express/)
* [MongoDB](https://www.mongodb.com/)

## Contributing

Email [us](jybantang@up.edu.ph) :)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Patrick Buitre** - [Github](https://github.com/pats110217)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

