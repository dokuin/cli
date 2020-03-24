# dokuinjs

### It lets you make documentation for your Program easier. New to dokuInjs ? Take a look Tutorial and Guide

## Table of Content

- Installation
- Usage
- Example

## Instalation

Make sure you have npm installed. Then install dokuinjs to be used in your project with command

```shell
npm install dokuinjs
```

## Usage

* ### you should run dokuinjs in your terminal with command ###

```shell
dokuin init
```

* ### input about your project ###

```shell
Projct's name :

Project's Description :

Base URL :

Author's name :
```

* ### run dokuinjs with command ###

```shell
dokuin create
```

* ### input your endpoints

##### you can put your endpoints as many as you want ###

```shell
HTTP method:

Headers (yes/no) :

QueryParams (yes/no) :

Body (yes/no) :
```

* ### now run dokuinjs to get all responses from your endpoints ###

```shell
dokuin run
```

* ### and finally convert your responses to md file ###

```shell
dokuin convert
```

voila your documentation is ready !

## Example

* ### Instal and make config file from dokuinjs ###

```shell
npm i dokuinjs

What's your project's name ? Entertainme

What's the author's name ? Meggy
```

* ### input your endpoints with command ###

#### 1. Example

```shell
dokuin create

your endpoints

HTTP method : get
Path:

Headers (yes/no) : yes
key: token
value :    dok23uin42js52ist52di32e78be67ste
Add more Headers (yes/no) : no

QueryParams (yes/no) : yes
key : id
value : w8974e89is0oo
add more params (yes/no) : no

Add more endpoints (yes/no) : no

```

#### 2. Example

```shell
dokuinjs create

your endpoints

HTTP method : put
Path: movies/

Headers (yes/no) : yes
key: token
value :    dok23uin42js52ist52di32e78be67ste
Add more Headers (yes/no) : no

QueryParams (yes/no) : yes
key : movieId
value : w8974e89is0oo
add more params (yes/no) : no

Body (yes/no) : yes
key : title
value :  dark
add more Query (yes/no) : yes
key : genre
value :  adventure
add more Query (yes/no) : yes
key : popularity
value :  34.912
add more Query (yes/no) : no

Add more endpoints (yes/no) : no

```

* ### with this command dokuinjs will run all your endpoints ###

```shell
dokuin run
```

* ### and now you can get your md documentation from your respose ###

```shell
dokuin convert
```
