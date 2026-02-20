---
title: Airflow Project Structure
date: 2024-11-16
draft: false
tags: 
complete: true
---
```python
├─api
│  ├─auth
│  │  └─backend
│  ├─client
│  └─common
├─api_connexion
│  ├─endpoints
│  ├─openapi
│  └─schemas
├─api_fastapi
│  ├─common
│  │  └─db
│  ├─core_api
│  │  ├─datamodels
│  │  │  └─ui
│  │  ├─openapi
│  │  └─routes
│  │      ├─public
│  │      └─ui
│  └─execution_api
│      ├─datamodels
│      └─routes
├─api_internal
│  ├─endpoints
│  └─openapi
├─assets
├─auth
│  └─managers
│      ├─models
│      ├─simple
│      │  └─views
│      └─utils
├─callbacks
├─cli
│  └─commands
├─compat
├─config_templates
├─dag_processing
│  └─bundles
├─datasets
├─decorators
├─example_dags
│  ├─libs
│  ├─plugins
│  └─sql
├─executors
├─hooks
├─io
│  ├─store
│  └─utils
├─jobs
├─lineage
├─listeners
│  └─spec
├─macros
├─metrics
├─migrations
│  └─versions
├─models
├─notifications
├─operators
├─secrets
├─security
├─sensors
├─serialization
│  ├─pydantic
│  └─serializers
├─task
├─template
├─timetables
├─ti_deps
│  └─deps
├─traces
├─triggers
├─ui
│  ├─dev
│  ├─openapi-gen
│  │  ├─queries
│  │  └─requests
│  │      └─core
│  ├─public
│  ├─rules
│  └─src
│      ├─assets
│      ├─components
│      │  ├─DataTable
│      │  ├─TriggerDag
│      │  └─ui
│      │      ├─Accordion
│      │      ├─Dialog
│      │      ├─Pagination
│      │      └─Select
│      ├─constants
│      ├─context
│      │  ├─colorMode
│      │  └─timezone
│      ├─layouts
│      │  └─Nav
│      ├─pages
│      │  ├─DagsList
│      │  │  └─Dag
│      │  │      └─Code
│      │  ├─Dashboard
│      │  │  └─HistoricalMetrics
│      │  └─Events
│      ├─queries
│      └─utils
├─utils
│  └─log
├─www
│  ├─extensions
│  ├─fab_security
│  ├─static
│  │  ├─css
│  │  └─js
│  │      ├─api
│  │      ├─assets
│  │      │  └─Graph
│  │      ├─cluster-activity
│  │      │  ├─historical-metrics
│  │      │  ├─live-metrics
│  │      │  └─nav
│  │      ├─components
│  │      │  ├─Graph
│  │      │  ├─NewTable
│  │      │  └─Table
│  │      ├─context
│  │      ├─dag
│  │      │  ├─details
│  │      │  │  ├─dag
│  │      │  │  ├─dagCode
│  │      │  │  ├─dagRun
│  │      │  │  ├─gantt
│  │      │  │  ├─graph
│  │      │  │  ├─task
│  │      │  │  └─taskInstance
│  │      │  │      ├─Logs
│  │      │  │      ├─taskActions
│  │      │  │      └─Xcom
│  │      │  ├─grid
│  │      │  │  └─dagRuns
│  │      │  └─nav
│  │      ├─login
│  │      ├─types
│  │      └─utils
│  └─templates
│      ├─airflow
│      ├─analytics
│      ├─appbuilder
│      └─swagger-ui
└─_vendor
```

## Main Function
```python
"""Main executable module."""  
  
from __future__ import annotations  
  
import os  
from argparse import Namespace  
  
import argcomplete  
  
# The configuration module initializes and validates the conf object as a side effect the first  
# time it is imported. If it is not imported before importing the settings module, the conf  
# object will then be initted/validated as a side effect of it being imported in settings,  
# however this can cause issues since those modules are very tightly coupled and can  
# very easily cause import cycles in the conf init/validate code (since downstream code from  
# those functions likely import settings).  
# Therefore importing configuration early (as the first airflow import) avoids  
# any possible import cycles with settings downstream.  
from airflow import configuration  
from airflow.cli import cli_parser  
from airflow.configuration import AirflowConfigParser, write_webserver_configuration_if_needed  
from airflow.exceptions import AirflowException  
  
  
def main():  
    conf = configuration.conf  
    if conf.get("core", "security") == "kerberos":  
        os.environ["KRB5CCNAME"] = conf.get("kerberos", "ccache")  
        os.environ["KRB5_KTNAME"] = conf.get("kerberos", "keytab")  
    parser = cli_parser.get_parser()  
    argcomplete.autocomplete(parser)  
    args = parser.parse_args()  
    if args.subcommand not in ["lazy_loaded", "version"]:  
        # Here we ensure that the default configuration is written if needed before running any command  
        # that might need it. This used to be done during configuration initialization but having it        # in main ensures that it is not done during tests and other ways airflow imports are used        from airflow.configuration import write_default_airflow_configuration_if_needed  
  
        conf = write_default_airflow_configuration_if_needed()  
        if args.subcommand in ["webserver", "internal-api", "worker"]:  
            write_webserver_configuration_if_needed(conf)  
    configure_internal_api(args, conf)  
  
    args.func(args)  
  
  
def configure_internal_api(args: Namespace, conf: AirflowConfigParser):  
    if conf.getboolean("core", "database_access_isolation", fallback=False):  
        if args.subcommand in ["worker", "dag-processor", "triggerer", "run"]:  
            # Untrusted components  
            if "AIRFLOW__DATABASE__SQL_ALCHEMY_CONN" in os.environ:  
                # make sure that the DB is not available for the components that should not access it  
                os.environ["AIRFLOW__DATABASE__SQL_ALCHEMY_CONN"] = "none://"  
                conf.set("database", "sql_alchemy_conn", "none://")  
            from airflow.api_internal.internal_api_call import InternalApiConfig  
  
            InternalApiConfig.set_use_internal_api(args.subcommand)  
        else:  
            # Trusted components (this setting is mostly for Breeze where db_isolation and DB are both set  
            db_connection_url = conf.get("database", "sql_alchemy_conn")  
            if not db_connection_url or db_connection_url == "none://":  
                raise AirflowException(  
                    f"Running trusted components {args.subcommand} in db isolation mode "                    f"requires connection to be configured via database/sql_alchemy_conn."                )  
            from airflow.api_internal.internal_api_call import InternalApiConfig  
  
            InternalApiConfig.set_use_database_access(args.subcommand)  
  
  
if __name__ == "__main__":  
    main()
```


