---
title: Elasticsearch Docker
date: 2025-12-16
draft: false
tags:
  - Elastic
complete: true
banner: /_assets/_img/_banners/nebula.jpg
---


```yml
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
     # - path.repo=/usr/share/elasticsearch/backup
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata:/usr/share/elasticsearch/data
     # - /Users/john/playground/kafka/backup:/usr/share/elasticsearch/backup # sample data
    ports:
      - 9200:9200
    networks:
      - elastic-net

  kibana:
    image: docker.elastic.co/kibana/kibana:8.13.2
    container_name: kibana
    environment:
      # Elasticsearch 서비스 이름(컨테이너 이름)을 사용하여 연결
      ELASTICSEARCH_HOSTS: '["http://elasticsearch:9200"]'
    ports:
      - 5601:5601 # Kibana 웹 인터페이스 포트
    networks:
      - elastic-net
    depends_on:
      - elasticsearch

volumes:
  esdata:
    driver: local

networks:
  elastic-net:
    driver: bridge
```


### multiple
```yml
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=docker-cluster
      - discovery.seed_hosts=es02,es03,es04,es05
      - cluster.initial_master_nodes=es01,es02,es03
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic-net

  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=docker-cluster
      - discovery.seed_hosts=es01,es03,es04,es05
      - cluster.initial_master_nodes=es01,es02,es03
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata02:/usr/share/elasticsearch/data
    networks:
      - elastic-net

  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=docker-cluster
      - discovery.seed_hosts=es01,es02,es04,es05
      - cluster.initial_master_nodes=es01,es02,es03
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata03:/usr/share/elasticsearch/data
    networks:
      - elastic-net

  es04:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: es04
    environment:
      - node.name=es04
      - cluster.name=docker-cluster
      - discovery.seed_hosts=es01,es02,es03,es05
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata04:/usr/share/elasticsearch/data
    networks:
      - elastic-net

  es05:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: es05
    environment:
      - node.name=es05
      - cluster.name=docker-cluster
      - discovery.seed_hosts=es01,es02,es03,es04
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata05:/usr/share/elasticsearch/data
    networks:
      - elastic-net

  kibana:
    image: docker.elastic.co/kibana/kibana:8.13.2
    container_name: kibana
    environment:
      ELASTICSEARCH_HOSTS: '["http://es01:9200","http://es02:9200","http://es03:9200"]'
    ports:
      - 5601:5601
    networks:
      - elastic-net
    depends_on:
      - es01
      - es02
      - es03

volumes:
  esdata01:
  esdata02:
  esdata03:
  esdata04:
  esdata05:

networks:
  elastic-net:
    driver: bridge

```

docker compose down -v

❯ docker system dfnd/kafka  docker system df                                                                                    ✔  system    17:34:04 
docker image prune -a
docker volume prune

TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          20        17        25GB      1.551GB (6%)
Containers      23        6         7.222GB   6.628GB (91%)
Local Volumes   14        12        11.34GB   73.66MB (0%)
Build Cache     0         0         0B        0B
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N]  y
## Sample Data

```
wget https://github.com/javacafe-project/elastic-book-snapshot/raw/master/book_backup.zip --no-check-certificate
```

https://github.com/javacafe-project/elastic-book-snapshot

```sh
mkdir -p /Users/john/playground/kafka/backup
chmod 755 /Users/john/playground/kafka/backup
```

```sh
unzip book_backup.zip
```


cURL
```
PUT /_snapshot/javacafe
{
  "type": "fs",
  "settings": {
    "location": "/usr/share/elasticsearch/backup/search_example",
    "compress": true
  }
}

GET /_snapshot/javacafe/_all
{
  "snapshots": [
    {
      "snapshot": "movie-search",
      "uuid": "Kz5k4fusS7KBZy55wLeZ0Q",
      "repository": "javacafe",
      "version_id": 6040399,
      "version": "6040399",
      "indices": [
        "movie_search"
      ],
      "data_streams": [],
      "include_global_state": false,
      "state": "SUCCESS",
      "start_time": "2019-03-23T16:01:04.910Z",
      "start_time_in_millis": 1553356864910,
      "end_time": "2019-03-23T16:01:05.342Z",
      "end_time_in_millis": 1553356865342,
      "duration_in_millis": 432,
      "failures": [],
      "shards": {
        "total": 5,
        "failed": 0,
        "successful": 5
      },
      "feature_states": []
    }
  ],
  "total": 1,
  "remaining": 0
}

POST /_snapshot/javacafe/movie-search/_restore

# license 에러 발생시
POST /_license/start_trial?acknowledge=true
```


## SingleNode에러

```python
PUT movie_search_v2
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  }
}


POST _reindex
{
  "from": {
    "index": "movie_search"
  },
  "to": {
    "index": "movie_search_v2"
  }
}

DELETE movie_search

PUT movie_search_v2/_alias/movie_search
```