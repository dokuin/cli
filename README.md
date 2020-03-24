![logo](./assets/images/dokuinlogo.png)
# DokuIn.js
[![npm version](https://img.shields.io/npm/v/dokuinjs.svg?style=flat-square)](https://www.npmjs.com/package/dokuinjs) [![install size](https://packagephobia.now.sh/badge?p=dokuinjs@1.2.0)](https://packagephobia.now.sh/result?p=dokuinjs@1.2.0) [![npm downloads](https://img.shields.io/npm/dm/dokuinjs.svg?style=flat-square)](https://npm-stat.com/charts.html?package=dokuinjs)
### Lets you make documentation for your REST API easier.  New to DokuIn.js ? Take a look at the Tutorial and Guide


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Example](#example)

## Installation
Make sure you have Node.js and NPM installed. Then you can install DokuIn.js in your machine globally with command
```shell
$ npm install -g dokuinjs
```

## Usage
### Run DokuIn.js in your terminal with command ###
```shell
$ dokuin init
```

### Provide your project details ###
```shell
Project Name :
Project Description :
Project Base URL :
Author :
```
 ### Run this command to show DokuIn.js menu list
```shell
$ dokuin start

Please choose 1 command :

[x]  Create new configuration
[ ]  Create new endpoint list
[ ]  Run endpoint list
[ ]  Generate Markdown
[ ]  Show endpoint list
[ ]  Add new endpoint into endpoint list
[ ]  Update an endpoint on the list 
[ ]  Delete endpoint in existing endpoint list

```
### Choose second option to create new endpoints ###
You can put your endpoints as many as you want.

```shell
[x]  Create new endpoint list
```

### This option will show endpoint list
```shell
[x]  Show endpoint list
```

### Choose this one to get all responses from endpoint list ###
```shell
[x]  Run endpoint list
```

### And finally convert responses to Markdown file with this option ###
```shell
[x]  Generate Markdown
```

Voila your documentation is ready!


## Example
### Install and make config file with DokuIn.js ###
```shell
$ npm i -g  dokuinjs

$ dokuin init

Project Name : netflux
Project Description : it is practice project restful api
Project Base URL : http://localhost:3000
Author : meggy
```

### Create endpoint list  ###

#### 1. Example
```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
[x]  Create new endpoint list
[ ]  Run endpoint list
[ ]  Generate Markdown
[ ]  Show endpoint list
[ ]  Add new endpoint into endpoint list
[ ]  Update an endpoint on the list 
[ ]  Delete endpoint in existing endpoint list

HTTP Method : get
Path: /products
Endpoint description : get all products

Add Headers ? (yes / no) yes
Key: token
Value: dok23uin42js52ist52di32e78be67ste
Add more headers ? (yes / no) no

Add Query Params ? (yes / no) yes
Key: id
Value: w8974e89is0oo
Add more query params ? (yes / no) no 

Add Request Body ? (yes / no) no
Add more endpoints ? (yes / no) no

```

#### 2. Example

```shell
$ dokuin start

Please choose 1 command :

[ ]  Create new configuration
[x]  Create new endpoint list
[ ]  Run endpoint list
[ ]  Generate Markdown
[ ]  Show endpoint list
[ ]  Add new endpoint into endpoint list
[ ]  Update an endpoint on the list 
[ ]  Delete endpoint in existing endpoint list

HTTP method: put
Path: /movies
Endpoint description: update one movie

Add Headers ? (yes / no): yes
Key: token
Value: dok23uin42js52ist52di32e78be67ste
Add more headers ? (yes / no) no

Add Query Params ? (yes / no) yes
Key: movieId
Value: w8974e89is0oo
Add more query params ? (yes / no) no

Add Request Body ? (yes / no) yes
Key: title
Value: dark
Key: genre
Value: adventure
Add more request body ? (yes / no) yes
Key: popularity
Value: 34.912
Add more request body ? (yes / no) no

Add more endpoints ? (yes / no) : no

```

### Show endpoint list ###
```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
..
..
[x]  Show endpoint list
.. 
..
..

----------------------------------------------------------------------------
|(index)| id  |  Method  |          Path               |    Description    |
|   1   |  1  |   GET    | http://localhost:3000       | Get all movies    |
|   2   |  2  |   POST   | http://localhost:3000/login | login             |
----------------------------------------------------------------------------

```


### Delete an endpoint  ###
```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
..
..
..
..
..
..
[x]  Delete endpoint in existing endpoint list

----------------------------------------------------------------------------
|(index)| id  |  Method  |          Path               |    Description    |
|   1   |  1  |   GET    | http://localhost:3000       | Get all movies    |
|   2   |  2  |   POST   | http://localhost:3000/login | login             |
----------------------------------------------------------------------------
Endpoint ID : 1 

```

### Add new endpoints to the list ###
```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
..
..
..
[x]  Add new endpoints into endpoint list
.. 
..

HTTP Method : post
Path: movies/

Add Headers ? (yes / no) no
Add Query Params ? (yes / no) no
Add Request Body ? (yes / no) yes

Key: email
Value: test@dokuinjs.com
Add more Request Body ? (yes / no) yes
Key: password
Value: 12opw9d9s
Add more request body ? (yes / no) no

Add more endpoints ? (yes / no) no

```
### Update an endpoint on the list ###

```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
..
..
..
..
..
[x]  Update an endpoint on the list 
..

Which endpoint 
[x] GET, http://localhost:3000
[ ] POST, http://localhost:3000/login

[ ] method
[ ] description
[ ] path
[ ] query 
[x] body

Current Value
key: username, value: caeasaradam
value: <updated value> 
More update ? (yes / no) yes 

[x] GET, http://localhost:3000
[ ] POST, http://localhost:3000/login

Which key 
[x] method
[ ] description
[ ] path
[ ] query 
[ ] body

Current Value: GET
HTTP Method:  <updated method> 
More Update ? (yes / no) no

```

### Run endpoint list ###
```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
..
[x]  Run endpoints
..
..
..
.. 
..

```


### Convert responses ###
```shell
$ dokuin start  

Please choose 1 command :

[ ]  Create new configuration
..
..
[x]  Generate Markdown
..
..
.. 
..

```


