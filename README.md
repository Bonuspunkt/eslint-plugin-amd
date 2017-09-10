# eslint-plugin-amd

[![Greenkeeper badge](https://badges.greenkeeper.io/Bonuspunkt/eslint-plugin-amd.svg)](https://greenkeeper.io/)

amd

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-amd`:

```
$ npm install eslint-plugin-amd --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-amd` globally.

## Usage

Add `amd` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "amd"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "amd/rule-name": 2
    }
}
```

## Supported Rules

see `tests/lib/rules`





