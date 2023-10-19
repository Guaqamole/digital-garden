---
title: How to see details of threads
date: 2023-10-16
draft: false
tags:
  - Linux
link: https://unix.stackexchange.com/questions/892/is-there-a-way-to-see-details-of-all-the-threads-that-a-process-has-in-linux
---
## Listing threads under Linux

### Current provide answers

I would like to make it clear that each answer here is providing you with exactly what you have specified, a list of all threads associated with a process, this may not be obvious in `htop` as it, by default, lists all threads on the system, not just the process but `top -H -p <pid>` works better for example:

```bash
top - 00:03:29 up 3 days, 14:49,  5 users,  load average: 0.76, 0.33, 0.18
Tasks:  18 total,   0 running,  18 sleeping,   0 stopped,   0 zombie
Cpu(s): 22.6%us,  5.7%sy,  4.2%ni, 66.2%id,  0.8%wa,  0.5%hi,  0.1%si,  0.0%st
Mem:   2063948k total,  1937744k used,   126204k free,   528256k buffers
Swap:  1052220k total,    11628k used,  1040592k free,   539684k cached

  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
30170 daniel    20   0  371m 140m 107m S 10.0  7.0   0:31.37 source:src
30066 daniel   -90   0  371m 140m 107m S  2.0  7.0   0:07.87 clementine
30046 daniel    20   0  371m 140m 107m S  0.0  7.0   0:32.05 clementine
30049 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.03 clementine
30050 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.31 clementine
30051 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30052 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30053 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30054 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.03 clementine
30055 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30056 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30057 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.04 clementine
30058 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30060 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.16 clementine
30061 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30062 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30064 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
30065 daniel    20   0  371m 140m 107m S  0.0  7.0   0:00.00 clementine
```

As a side note, the thread with `-90` is actually a real-time thread.

### but

There's also another option which is true CLI: `ps`. It depends if you want to look for a process id (`pid`), for an `application name`, or more `filters`.

It does not work on MacOS or BSD, as there the `-T` parameter has a different meaning and there is no alternative to show threads.

#### `ps` with a `pid`

Use `ps -T -p <pid>`

- `-T` lists all threads
- `-p` specifies the process id

Here's an example:

```bash
$ ps -T -p 30046
  PID  SPID TTY          TIME CMD       # this is here for clarity
30046 30046 pts/2    00:00:17 clementine
30046 30049 pts/2    00:00:00 clementine
30046 30050 pts/2    00:00:00 clementine
30046 30051 pts/2    00:00:00 clementine
30046 30052 pts/2    00:00:00 clementine
30046 30053 pts/2    00:00:00 clementine
30046 30054 pts/2    00:00:00 clementine
30046 30055 pts/2    00:00:00 clementine
30046 30056 pts/2    00:00:00 clementine
30046 30057 pts/2    00:00:00 clementine
30046 30058 pts/2    00:00:00 clementine
30046 30060 pts/2    00:00:00 clementine
30046 30061 pts/2    00:00:00 clementine
30046 30062 pts/2    00:00:00 clementine
30046 30064 pts/2    00:00:00 clementine
30046 30065 pts/2    00:00:00 clementine
30046 30066 pts/2    00:00:03 clementine
```

#### `ps` with an `application name`

Use `ps -T -C <application name>`

- `-T` lists all threads
- `-C` specifies the `<application name>`

Here's an example:

```bash
$ ps -e -T -C clementine
  PID  SPID TTY          TIME CMD       # this is here for clarity
30046 30046 pts/2    00:00:17 clementine
30046 30049 pts/2    00:00:00 clementine
30046 30050 pts/2    00:00:00 clementine
30046 30051 pts/2    00:00:00 clementine
30046 30052 pts/2    00:00:00 clementine
30046 30053 pts/2    00:00:00 clementine
30046 30054 pts/2    00:00:00 clementine
30046 30055 pts/2    00:00:00 clementine
30046 30056 pts/2    00:00:00 clementine
30046 30057 pts/2    00:00:00 clementine
30046 30058 pts/2    00:00:00 clementine
30046 30060 pts/2    00:00:00 clementine
30046 30061 pts/2    00:00:00 clementine
30046 30062 pts/2    00:00:00 clementine
30046 30064 pts/2    00:00:00 clementine
30046 30065 pts/2    00:00:00 clementine
30046 30066 pts/2    00:00:03 clementine
```

#### `ps` with a `filter`

Use `ps -e -T | grep <filter>`

- `-e` shows all processes
- `-T` lists all threads
- `|` pipes the output to the next command
- `grep` this filters the contents by a `<filter>` (in this case `<application name>`)

Here's an example:

```bash
$ ps -e -T | grep clementine
  PID  SPID TTY          TIME CMD       # this is here for clarity
30046 30046 pts/2    00:00:17 clementine
30046 30049 pts/2    00:00:00 clementine
30046 30050 pts/2    00:00:00 clementine
30046 30051 pts/2    00:00:00 clementine
30046 30052 pts/2    00:00:00 clementine
30046 30053 pts/2    00:00:00 clementine
30046 30054 pts/2    00:00:00 clementine
30046 30055 pts/2    00:00:00 clementine
30046 30056 pts/2    00:00:00 clementine
30046 30057 pts/2    00:00:00 clementine
30046 30058 pts/2    00:00:00 clementine
30046 30060 pts/2    00:00:00 clementine
30046 30061 pts/2    00:00:00 clementine
30046 30062 pts/2    00:00:00 clementine
30046 30064 pts/2    00:00:00 clementine
30046 30065 pts/2    00:00:00 clementine
30046 30066 pts/2    00:00:03 clementine
```

Each of these has the same PID so you know they are in the same process.