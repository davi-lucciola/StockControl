FROM python:3.10-alpine

WORKDIR /stockcontrol_api

COPY poetry.lock pyproject.toml /stockcontrol_api/

RUN pip3 install --upgrade pip &&\
    pip3 install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install 

COPY . /stockcontrol_api

EXPOSE 8080

CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8080"]
