FROM python:3.10-alpine

WORKDIR /stock_control

COPY poetry.lock pyproject.toml /stock_control/

RUN pip3 install --upgrade pip &&\
    pip3 install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install 

COPY . /stock_control

EXPOSE 8000

CMD ["uvicorn", "app:stock_control", "--host", "0.0.0.0", "--port", "8000", "--reload"]