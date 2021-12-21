# API

run it with command:

- npm install
- node index.js (or if nodemon installed in your device, use 'nodemon')

## USER

### POST /user/register

> Create a new user

_Request Header_

```
not needed

```

_Request Body_

```
{
  email : <posted-email>,
  password : <posted-password>,
  phone_number : <posted-phone-number>,
}
```

_Response (201)_

```
{
  message: "Successfully created user",
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### POST /user/login

> Login user

_Request Header_

```
not needed

```

_Request Body_

```
{
  email : <posted-email>,
  password : <posted-password>,
}
```

_Response (201)_

```
{
    message: "Successfully created user",
    token: "returned token",
}

```

_Response (400 - Bad Request)_

```
{
    message: "Wrong email or password",
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

## Voucher

### GET /voucher

> Get list of voucher

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Successfully retrieved voucher",
    "result": [
        {
            "id": 1,
            "title": "AAA",
            "desc": "A1",
            "expiry_date": "2021-12-20T17:00:00.000Z",
            "image": "aaaaaa.jpg",
            "amount": 1000,
            "payment_method": "visa",
            "discount": 5,
            "quantity": 500000,
            "buy_type": "others",
            "limit": 50,
            "status": "Active"
        },
        {},
        {},
        .....
    ]
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### GET /voucher/userVoucher/:id

> For retrieving user's voucher whether unused or used

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
not needed
```

_Request Params_

```
{
    id: <User id>
}
```

_Response (200)_

```
{
    "message": "user voucher retrieved",
    "result": [
        {
            "id": 1,
            "userId": "3",
            "voucherId": "1",
            "unused": 20,
            "used": 0
        },
        {
            "id": 2,
            "userId": "3",
            "voucherId": "2",
            "unused": 30,
            "used": 0
        }
    ]
}

```

_Response (404 - No data)_

```
{
    message: "No data found",
    result: [],
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### GET /voucher/verify

> For checking status of a voucher

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    title: <Voucher title>
}
```

_Response (200)_

```
{
    "message": "Successfully verify voucher",
    "result": <Voucher's status>
}

```

_Response (404 - No dato of the requested voucher)_

```
{
    message: "data not found",
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### GET /voucher/payMethodList

> For checking list of user payment method list

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    type: <Type of the payment method>
}
```

_Response (200)_

```
{
    message: "User's payment list method successfully retrieved",
    result: <list of this user payment method>,
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### GET /voucher/:id

> Get voucher based on id

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Params_

```
{
    id: <Id of the voucher>
}
```

_Response (200)_

```
{
    message: "Successfully retrieved vouch",
    result: [{
        "id": 2,
        "title": "BBB",
        "desc": "BB2",
        "expiry_date": "2021-12-20T17:00:00.000Z",
        "image": "bbbbbb.jpg",
        "amount": 800,
        "payment_method": "mastercard",
        "discount": 7,
        "quantity": 200000,
        "buy_type": "others",
        "limit": 500,
        "status": "Active"
    }]
}

```

_Response (404 - No data of the voucher found)_

```
{
  message: "data not found",
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### POST /voucher

> Create a new voucher

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    title: <title of the voucher>,
    desc: <description of the voucher>,
    expiry_date: <expiry date of the voucher>,
    image: <image-url of the voucher>,
    amount: <how much this voucher worth>,
    payment_method: <how to pay this voucher>,
    discount: <how much discount when paying with payment method above>,
    quantity: <total quantity of this voucher as a whole>,
    buy_type: <for 'myself' or 'others'>,
    limit: <limit per person>,
}
```

_Response (400 - If there missing field in the body)_

```
{
  message: "there are missing fields",
}
```

_Response (201)_

```
{
    message: "Successfully created voucher",
}

```
_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### POST /voucher/checkout

> for checkout

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    "items" : [{
        "id" : 1,
        "quantity" : 20
    },{
        "id" : 5,
        "quantity" : 30
    },{
        "id": 1,
        "quantity": 50
    }]
}
```

_Response (400 - If there missing field in the body)_

```
{
  message: "there are missing fields",
}
```

_Response (200)_

```
{
    message: "Checking out",
    data: [{
        name: <title of the voucher>,
        unit_amount: <price of the voucher>,
        quantity: <requested quantity for this voucher>,
    },
    {},
    {},....],
}

```
_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### POST /voucher/payment

> For making a payment

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    amount: <total amount>, 
    number: <card number>,
    exp_month: <card expiry month>,
    exp_year: <card expiry year>,
    items: [{
        "id" : 1,
        "quantity" : 20
    },{
        "id" : 2,
        "quantity" : 30
    }]
}
```

_Response (400 - If there missing field in the body)_

```
{
  message: "there are missing fields",
}
```

_Response (200)_

```
{
    message: "Successfully make a payment",
}

```
_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### PUT /voucher/used

> change amount of a voucher from unused to used

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    voucherId: <id of the voucher>,
    userId: <id of the user>,
    amount: <how many of the voucher would be used>,
}
```

_Response (200)_

```
{
    message: `<amount> of voucher(s) used`,
}

```
_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### PUT /voucher/status/:id

> change status of a voucher

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    status: <new status>,
}
```

_Request Params_

```
{
    id: <id of the voucher>,
}
```

_Response (200)_

```
{
    message: "Successfully change status",
}

```
_Response (404)_

```
{
    message: "voucher not found",
}

```
_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```

### PUT /voucher/:id

> edit a voucher

_Request Header_

```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_

```
{
    title: <title of the voucher>,
    desc: <description of the voucher>,
    expiry_date: <expiry date of the voucher>,
    image: <image-url of the voucher>,
    amount: <how much this voucher worth>,
    payment_method: <how to pay this voucher>,
    discount: <how much discount when paying with payment method above>,
    quantity: <total quantity of this voucher as a whole>,
    buy_type: <for 'myself' or 'others'>,
    limit: <limit per person>,
    status: <status of the voucher>
}
```

_Request Params_

```
{
    id: <id of the voucher>,
}
```

_Response (200)_

```
{
    message: `Successfully updated voucher with id <id of the voucher>`,
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "<returned error message>"
}
```
