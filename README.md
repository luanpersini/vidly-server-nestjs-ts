# Vidly-Server-NestJS-TS

# Objectives

The main objective of this project is to convert a higly coupled server APP built using NodeJS-Javascript-Mongoose to a low coupled APP using NodeJS-NestJS-Typescript-MongoDb, following SOLID, TDD and Clean Code principles. The idea is to deal with the challanges of the conversion, focusing on the tecnologies instead of the bussiness rules and solutions that the App will delivery.

The frontend can be fount at https://github.com/luanpersini/vidly-front-react-ts

**From:**

- NodeJS (higly coupled to express, mongoose and other libraries, few tests)
- Javascript (no types)
- Mongoose (higly coupled)

**To:**
- NodeJS (low coupled - using ports and adapters)
- NestJS (low coupled framework)
- Typescript (strongly typed)
- MongoDB (low coupled)

## Vidly

Vidly is a movie rent plataform where you can manage movies, customers, rents and genres. Authentication and authorization is present and all data is consumed from an external API, build in nodejs. The customers and rent

## Tests

- files .spec.ts: unit tests
- files .test.ts: integration tests

## What was archieve so far: Challanges and Knowledge Base

NestJS is focused on fast development. The structure provided by Nest allowed me to develop most of the usual stuff and test without using interfaces for the services and repositories. In most of the cases you can develop the typical 3 way structure edge to edge (controller-service-repository) with ease, removind the need to mock everyting for the unit tests, leading to the more reliable integration tests. 

The interaction with the built-in supported databases and ORMs also helps to speedup the development. The database connection is easily injected in the modules, being necessary just to point the models or entities that will define the rules of the database operations. 

</br>

- Learned how to make a Base Abstract Repository with the most used functions to avoid repetition, speeding up the development.
- Learned [how to implement abstraction in NestJS.](/docs/knowledge-base/abstraction-in-nestjs.md)
- Learned [how to use DTOs in NestJS](https://docs.nestjs.com/controllers#request-payloads) and [how to make NestJs only accept properties that are specified in the whitelist](https://docs.nestjs.com/techniques/validation#stripping-properties).
- Learned that NestJS handle all uncaught exceptions because the framework have a built-in exception handler.
- Implemented a Http exception filter to standardize the exception response.


</br>

**Credits:**

The original app was build by Mosh. You can find his courses at: https://codewithmosh.com/