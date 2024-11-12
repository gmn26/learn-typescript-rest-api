# USER API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "gmnovrial",
  "password": "gmnovrial",
  "name": "Ghazy Muhari Novrial"
}
```

Respone Body (Success) :

```json
{
  "data": {
    "username": "gmnovrial",
    "name": "Ghazy Muhari Novrial"
  }
}
```

Respone Body (Failed) :

```json
{
  "errors": "Usernme already taken"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "gmnovrial",
  "password": "gmnovrial"
}
```

Respone Body (Success) :

```json
{
  "data": {
    "username": "gmnovrial",
    "name": "Ghazy Muhari Novrial",
    "token": "token"
  }
}
```

Respone Body (Failed) :

```json
{
  "errors": "Wrong username or password"
}
```

## Get User

Endpoint: GET /api/users/current

Request Header :

- X-API-TOKEN: token

Respone Body (Success) :

```json
{
  "data": {
    "username": "gmnovrial",
    "name": "Ghazy Muhari Novrial"
  }
}
```

Respone Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": "Ghazy Muhari Novrial" // tidak wajib
}
```

Respone Body (Success) :

```json
{
  "data": {
    "username": "gmnovrial",
    "name": "Ghazy Muhari Novrial"
  }
}
```

Respone Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header:

- X-API-TOKEN: token

Respone Body (Success) :

```json
{
  "data": "OK"
}
```

Request Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
