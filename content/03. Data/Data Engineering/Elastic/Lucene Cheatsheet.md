---
title: Lucene Cheatsheet
date: 2024-04-12
draft: false
tags:
  - Lucene
complete: true
---
## Basic queries
Lucene indexes can be case-sensitive or case-insensitive, depending on configuration.

```
cats

CATS

CaTs
```

Unlike other search engines, Lucene defaults term-pairing to ORs rather than ANDs.

### Union
```
cats dogs

cats OR dogs
```

### Intersect
Most of the time, you will want to remember to explicitly AND terms together:

```
cats AND dogs

+cats +dogs
```

### Nesting
```
(+cats +dogs) (+"peanut butter" +jelly)
```

### Subtraction
Minus (`-`) excludes a term from results, and automatically ANDs it with the rest of the query.

```
cats -dogs

cats AND NOT dogs
```

### Phrases
```
"grumpy cat"
```

### Wildcards
Question mark (`?`) matches a single, arbitrary character.

Asterisk (`*`) matches any word or phrase.

Notes:
* Wildcards and other special characters (e.g., `+`, `-`, `&`, `|`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `~`, `*`, `?`, `:`, `and \`) need to be escaped (e.g., `\?`, `\?`) when used inside phrases/strings, or searched for as a literal.
* An asterisk cannot be used as the first character of a term (e.g., `*oogle` is bad syntax).

```
cats

c?ts

+khtml +like +Gecko

+khtml +like +Geck?

"khtml like Geck\?"

+"khtml, like" +Ge*

"khtml, like \*"

error\:
```

### Fuzzy searches
Lucene can search for similar terms:

```
integer~
```

will match on `integer`, `integers`, and `intejer`.

#### Specify a threshold
An optional fuzziness threshold can be specified, from 0.0 (very loose) to 1.0 (very strict).

```
integer~

integer~0.5

integer~0.4

integer~0.6
```

## Operators

### Host-specific search
Hosts tend to require fully qualified domain names (e.g., `google` is bad syntax, `google.com` is good syntax). Though wildcards can help abbreviate this.

```
host:tomcat.apache.org

host:tomcat*
```

### Log file path
```
path:catalina*
```

### Custom attributes
Each Lucene index may specify additional query operators. Common operators include `message:` and `timestamp:`.

Note: When a term is not prefixed with an operator, it is automatically searched for across all operators. For best results, it is often useful to not specify *any* operators for your search terms.