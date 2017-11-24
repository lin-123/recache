## Introduction
- add timestemp query to tags'[script, style, link] attribute src in html, to refresh cache.

## Installation
```
$ npm install -g recache-files
```

## Usage
```
$ recache --help


Usage: recache [options] <dir>


  Options:

    -V, --version         output the version number
    -t, --types <type>    recache file types, default is <script,style,link>
    -q, --quiet <type>    recache will not print anything
    -r, --restore <type>  remove t=timestemp from files
    -h, --help            output usage information
```

### Example
- `recache -t script,style example`
- before
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
</head>
<body>
    <style type="text/css" src='./ss.s'></style>
    <link rel="stylesheet" type="text/css" href="asdf.css">
    <script type="text/javascript" src="../dist/index.min.js"></script>
</body>
</html>
```
- after
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
</head>
<body>
    <style type="text/css" src='./ss.s?t=1511270618570'></style>
    <link rel="stylesheet" type="text/css" href="asdf.css?t=1511270618570">
    <script type="text/javascript" src="../dist/index.min.js?t=1511270618570"></script>
</body>
</html>
```
## evirenment
- node `v6.10.0`

