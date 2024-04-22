# Stock Control

Project with PostgresSQL for controlling stock of products.

## Design

<img src="./assets/layout-3.png">
<img src="./assets/layout-2.png">
<img src="./assets/layout-1.png">

### Technologies

- ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## Frontend

### Architecture

Based in MVVM, the frontend are divided in 3 layers:

#### View

This layer is the UI layer, this layer was divided in 2 moudules / main components: products and stocks
The stock component are the side bar, where i put the history of incomes and outcomes, and the modal for register new stock history.
The product component are the main page on right, with product table, product filter and the modal for creating/editing products.
When the states change, are controlled by the "Controller" layer.

#### Controller

This layer are divided in 2 parts, context and hooks. The contexts stores the application states, and the hooks give to the view the functions that will change the states
The hook function are DOM Event Handlers.

#### Domain

This layer is where we have the Domain (Business) Models, Payloads Models, and API Comunication Service.

## Backend

### API

For see all the documentation on swagger access `/docs` endpoint.

- Product
  - Search Products: GET    - `/product`
  - Create Product : POST   - `/product`
  - Update Product : PUT    - `/product/{id}`
  - Delete Product : DELETE - `/product/{id}`
  
- Stock
  - History Stock  : GET    - `/stock/history`
  - Input Stock    : POST   - `/stock/in`
  - Output Stock   : DELETE - `/stock/out`

### Architecture

I have divided the backend into the following layers:

- controllers
- models
- services
- repositories

#### Controllers

This is the layer where i receive data via http, declare endpoints and cofigure the swagger documentation. This data are mapped by models layer and after recive the data this layer calls the service layer to do business logic.

#### Models

This is the layer i mapped the DTOs for recive data via http, and mapped the ORM Models with `SQLModel`. 
This models are used by all other layers.

#### Services

This is the layer where the business logic are applied, this layers calls the repository layer for data persistence and query data.

#### Repositories

This is the layer where the system access the `PostgreSQL` database, creating functions for querying and persist products and stocks registers.

## How to run local

### With Docker

1. Build the repository image:
> `docker compose build`
2. Run the container:
> `docker compose up -d`

Finish! Now the application are running in your machine!
