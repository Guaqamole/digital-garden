---
title: Pre-commit
date: 2024-11-24
draft: false
tags:
  - DevTools
  - Git
complete: true
---
### Using pre-commit

After installation, pre-commit hooks are run automatically when you commit the code. But you can run pre-commit hooks manually as needed.

- Run all checks on your staged files by using:

```shell
pre-commit run
```

- Run only mypy check on your staged files (in `airflow/` excluding providers) by using:

```shell
pre-commit run mypy-airflow
```

- Run only mypy checks on all files by using:

```shell
pre-commit run mypy-airflow --all-files
```

- Run all checks on all files by using:

```shell
pre-commit run --all-files
```

- Run all checks only on files modified in the last locally available commit in your checked out branch:

```shell
pre-commit run --source=HEAD^ --origin=HEAD
```

- Show files modified automatically by pre-commit when pre-commits automatically fix errors

```shell
pre-commit run --show-diff-on-failure
```

- Skip one or more of the checks by specifying a comma-separated list of checks to skip in the SKIP variable:

```shell
SKIP=mypy-airflow,ruff pre-commit run --all-files
```

You can always skip running the tests by providing `--no-verify` flag to the `git commit` command.

To check other usage types of the pre-commit framework, see [Pre-commit website](https://pre-commit.com/).

### Disabling particular checks


In case you have a problem with running particular `pre-commit` check you can still continue using the benefits of having `pre-commit` installed, with some of the checks disabled. In order to disable checks you might need to set `SKIP` environment variable to coma-separated list of checks to skip. For example, when you want to skip some checks (ruff/mypy for example), you should be able to do it by setting `export SKIP=ruff,mypy-airflow,`. You can also add this to your `.bashrc` or `.zshrc` if you do not want to set it manually every time you enter the terminal.

In case you do not have breeze image configured locally, you can also disable all checks that require breeze the image by setting `SKIP_BREEZE_PRE_COMMITS` to "true". This will mark the tests as "green" automatically when run locally (note that those checks will anyway run in CI).

### Manual pre-commits

[](https://github.com/apache/airflow/blob/main/contributing-docs/08_static_code_checks.rst#manual-pre-commits)

Most of the checks we run are configured to run automatically when you commit the code. However, there are some checks that are not run automatically and you need to run them manually. Those checks are marked with `manual` in the `Description` column in the table below. You can run them manually by running `pre-commit run --hook-stage manual <hook-id>`.

### Mypy checks

[](https://github.com/apache/airflow/blob/main/contributing-docs/08_static_code_checks.rst#mypy-checks)

When we run mypy checks locally when committing a change, one of the `mypy-*` checks is run, `mypy-airflow`, `mypy-dev`, `mypy-providers`, `mypy-docs`, depending on the files you are changing. The mypy checks are run by passing those changed files to mypy. This is way faster than running checks for all files (even if mypy cache is used - especially when you change a file in airflow core that is imported and used by many files). However, in some cases, it produces different results than when running checks for the whole set of files, because `mypy` does not even know that some types are defined in other files and it might not be able to follow imports properly if they are dynamic. Therefore in CI we run `mypy` check for whole directories (`airflow` - excluding providers, `providers`, `dev` and `docs`) to make sure that we catch all `mypy` errors - so you can experience different results when running mypy locally and in CI. If you want to run mypy checks for all files locally, you can do it by running the following command (example for `airflow` files):

```shell
pre-commit run --hook-stage manual mypy-<FOLDER> --all-files
```

For example:

```shell
pre-commit run --hook-stage manual mypy-airflow --all-files
```

MyPy uses a separate docker-volume (called `mypy-cache-volume`) that keeps the cache of last MyPy execution in order to speed MyPy checks up (sometimes by order of magnitude). While in most cases MyPy will handle refreshing the cache when and if needed, there are some cases when it won't (cache invalidation is the hard problem in computer science). This might happen for example when we upgrade MyPY. In such cases you might need to manually remove the cache volume by running `breeze down --cleanup-mypy-cache`.

### Running static code checks via Breeze

[](https://github.com/apache/airflow/blob/main/contributing-docs/08_static_code_checks.rst#running-static-code-checks-via-breeze)

The static code checks can be launched using the Breeze environment.

You run the static code checks via `breeze static-check` or commands.

You can see the list of available static checks either via `--help` flag or by using the autocomplete option.

Run the `mypy` check for the currently staged changes (in `airflow/` excluding providers):

```shell
breeze static-checks --type mypy-airflow
```

Run the `mypy` check for all files:

```shell
breeze static-checks --type mypy-airflow --all-files
```

Run the `ruff` check for the `tests/core.py` file with verbose output:

```shell
breeze static-checks --type ruff --file tests/core.py --verbose
```

Run the `ruff` check for the `tests.core` package with verbose output:

```shell
breeze static-checks --type ruff --file tests/core/* --verbose
```

Run the `ruff-format` check for the files `airflow/example_dags/example_bash_operator.py` and `airflow/example_dags/example_python_operator.py`:

```shell
breeze static-checks --type ruff-format --file airflow/example_dags/example_bash_operator.py \
    airflow/example_dags/example_python_operator.py
```

Run all checks for the currently staged files:

```shell
breeze static-checks
```

Run all checks for all files:

```shell
breeze static-checks --all-files
```

Run all checks for last commit:

```shell
breeze static-checks --last-commit
```

Run all checks for all changes in my branch since branched from main:

```shell
breeze static-checks --type mypy-airflow --only-my-changes
```

More examples can be found in [Breeze documentation](https://github.com/apache/airflow/blob/main/dev/breeze/doc/03_developer_tasks.rst#running-static-checks)

### Debugging pre-commit check scripts requiring image

[](https://github.com/apache/airflow/blob/main/contributing-docs/08_static_code_checks.rst#debugging-pre-commit-check-scripts-requiring-image)

Those commits that use Breeze docker image might sometimes fail, depending on your operating system and docker setup, so sometimes it might be required to run debugging with the commands. This is done via two environment variables `VERBOSE` and `DRY_RUN`. Setting them to "true" will respectively show the commands to run before running them or skip running the commands.

Note that you need to run pre-commit with --verbose command to get the output regardless of the status of the static check (normally it will only show output on failure).

Printing the commands while executing:

```shell
VERBOSE="true" pre-commit run --verbose ruff
```

Just performing dry run:

```shell
DRY_RUN="true" pre-commit run --verbose ruff
```

---

Once your code passes all the static code checks, you should take a look at [Testing documentation](https://github.com/apache/airflow/blob/main/contributing-docs/09_testing.rst) to learn about various ways to test the code.