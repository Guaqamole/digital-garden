---
title: PetClinic Overview
date: 2024-04-02
draft: false
tags:
  - Spring
  - Backend
  - Demo
complete: true
---
## Github
https://github.com/spring-projects/spring-petclinic

## Project Structrue
```
├── gradle
│   └── wrapper
├── src
│   ├── checkstyle
│   ├── main
│   │   ├── java
│   │   │   └── org
│   │   │       └── springframework
│   │   │           └── samples
│   │   │               └── petclinic
│   │   │                   ├── model
│   │   │                   ├── owner
│   │   │                   ├── system
│   │   │                   └── vet
│   │   ├── resources
│   │   │   ├── db
│   │   │   │   ├── h2
│   │   │   │   ├── hsqldb
│   │   │   │   ├── mysql
│   │   │   │   └── postgres
│   │   │   ├── messages
│   │   │   ├── static
│   │   │   │   └── resources
│   │   │   │       ├── css
│   │   │   │       ├── fonts
│   │   │   │       └── images
│   │   │   └── templates
│   │   │       ├── fragments
│   │   │       ├── owners
│   │   │       ├── pets
│   │   │       └── vets
│   │   └── scss
│   └── test
│       ├── java
│       │   └── org
│       │       └── springframework
│       │           └── samples
│       │               └── petclinic
│       │                   ├── model
│       │                   ├── owner
│       │                   ├── service
│       │                   ├── system
│       │                   └── vet
│       └── jmeter
└── target
    ├── classes
    │   ├── db
    │   │   ├── h2
    │   │   ├── hsqldb
    │   │   ├── mysql
    │   │   └── postgres
    │   ├── messages
    │   ├── org
    │   │   └── springframework
    │   │       └── samples
    │   │           └── petclinic
    │   │               ├── model
    │   │               ├── owner
    │   │               ├── system
    │   │               └── vet
    │   ├── static
    │   │   └── resources
    │   │       ├── css
    │   │       ├── fonts
    │   │       └── images
    │   └── templates
    │       ├── fragments
    │       ├── owners
    │       ├── pets
    │       └── vets
    └── generated-sources
        └── annotations
```