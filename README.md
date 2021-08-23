# Extend Apps Application

This repository was created to apply for "Netsuite Product Developer".

It has three components

- [Netsuite Web Service](netsuite/)
- [Java Middleware](nsClient/)
- [Ionic Client](nsMiddle/)

## Netsuite Web Service

This component is an SDF project created using SuiteScript 2.1. The project contains the objects

- [Custom Record](netsuite/src/Objects/customrecord_vac_book.xml) to store a book collection
- [Restlet Script](netsuite/src/FileCabinet/SuiteScripts/easerver/vac_nsserver_rs.js), which is in charge of handling the POST, GET, and PUT http requests. 

Also, a [custom module](netsuite/src/FileCabinet/SuiteScripts/easerver/vac_book_cm.js) handles the book operations; Book searching, creating, and edition.

## Java Middleware
A Netsuite integration just allows a server-to-server connection when the client is outside. For that reason, a middleware was created to connect the client and the Netsuite Web Service.

## Ionic 3 Project

The framework was chosen due to the position require a TypeScript programming language and npm.
The client manages the following operations

- [Fetch](nsClient/src/pages/book-list/book-list.ts) books from Netsuite
- [Creation](nsClient/src/pages/book-create/book-create.ts) of a new book record
- [Edition](nsClient/src/pages/book-create/book-create.ts) of a selected book record
- [View](nsClient/src/pages/book-detail/book-detail.ts) of a selected book
- [Internal Service](nsClient/src/providers/book/book.ts)

This framework allows deploying the project on an Android device.

You can watch it in action, just hit the [link](https://www.linkedin.com/posts/vladimir-aca_netsuite-ionicframework-activity-6835713170355605504-NwSY)