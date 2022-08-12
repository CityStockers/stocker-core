# Stocker-core

This package have all the models(schema) for mongo DB

# How to Install Gcloud CLI

## Install Link

https://cloud.google.com/sdk/docs/install

## Auth Login

```
gcloud auth application-default login
```

# How to use Cloud SQL Proxy.

## For Mac OS M1 Chip

```bash
$ curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
$ chmod +x cloud_sql_proxy
```

## How to get connection name

```
$ gcloud sql instances describe <INSTANCE_NAME> | grep connectionName
```

## How to run cloud proxy

```
$ ./cloud_sql_proxy -instances=<INSTANCE_CONNECTION_NAME>=tcp:5432
# ./cloud_sql_proxy -instances=stocker-357815:asia-east2:stocker-main=tcp:5432
```
