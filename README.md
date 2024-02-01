# Stock Control

Project with TinyDB for controlling stock of products.

## Endpoints

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

## How to run local

### With Python

1. Install Python >= 3.10
2. Install [Poetry](https://python-poetry.org/)
3. Install dependencies:
> `poetry install`
4. Start your application running:
> `poetry run unvicorn app:stock_control --host '0.0.0.0' --port 8000 --reload`

### With Docker

1. Build the repository image:
> `docker build . -t <image-name>`
2. Run the container:
> `docker run -p 8000:8000 --name <container-name> -d <image-name>`

Finish! Now the application are running in your machine!
