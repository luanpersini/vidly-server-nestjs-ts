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

</br>

- Learned [how to implement abstraction in NestJS.](/docs/knowledge-base/abstraction-in-nestjs.md)
- Learned [how to use DTOs in NestJS](https://docs.nestjs.com/controllers#request-payloads) and [how to make NestJs only accept properties that are specified in the whitelist](https://docs.nestjs.com/techniques/validation#stripping-properties).



</br>

**Credits:**

The original app was build by Mosh. You can find his courses at: https://codewithmosh.com/