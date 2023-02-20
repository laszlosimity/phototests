FROM node:current-alpine





WORKDIR /demo-python
COPY test-requirements.txt /demo-python
RUN pip install -r test-requirements.txt
COPY ./tests/ /demo-python/tests/