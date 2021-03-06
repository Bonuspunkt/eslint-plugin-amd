/**
 * @fileoverview check to keep dependency name inline with variable name
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/sane-dependency-names"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("sane-dependency-names", rule, {

    valid: [
        "define([])",
        "define(function() { });",
        "define([a], function(a) { });",
        "define(['string'], function(string) { });",
        "define('id', ['string'], function(string) { });",

        "define(['directory/file'], function(file) { });",
        "define(['a'], function(a, b) { });",
        "define(['a','b'], function(a) { });",

        "define(['dir/loader!'], function(loader) { });",
        "define(['loader!file.ext'], function(file) { });",
        {
            code: "define(['a', 'b'], ({ method1, method2 }, b) => {});",
            parserOptions: { ecmaVersion: 2015 }
        },
        {
            code: "define(['a', 'b'], (a, { method1, method2 }) => {});",
            parserOptions: { ecmaVersion: 2015 }
        },
    ],

    invalid: [
        {
            code: "define(['string'], function(number) { });",
            errors: [{
                message: "'string' is mapped to number",
                type: "Identifier"
            }]
        },
        {
            code: "define('id', ['string'], function(number) { });",
            errors: [{
                message: "'string' is mapped to number",
                type: "Identifier"
            }]
        },
        {
            code: "define(['string'], function(str) { });",
            errors: [{
                message: "'string' is mapped to str",
                type: "Identifier"
            }]
        },
        {
            code: "define(['a', 'b'], function(a, c) { });",
            errors: [{
                message: "'b' is mapped to c",
                type: "Identifier"
            }]
        },
        {
            code: "define(['a', 'b', 'c'], function(a, { method1, method2 }, b) {});",
            parserOptions: { ecmaVersion: 2015 },
            errors: [{
                message: "'c' is mapped to b",
                type: "Identifier"
            }]
        },
    ]
});
