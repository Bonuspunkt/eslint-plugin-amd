/**
 * @fileoverview no unused required files
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-unused-dependencies"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-unused-dependencies", rule, {

    valid: [
        "define(function() { });",
        "define(['a'], function(a) { console.log(a); });",
        "define('id', ['a'], function(a) { console.log(a); });",
        {
            code: "define(['a'], function(A) { return <A/>; })",
            parserOptions: { "ecmaFeatures": { "jsx": true } }
        }
    ],

    invalid: [
        {
            code: "define(['a'], function(a) { });",
            errors: [{
                message: "a is never used",
                type: "Identifier"
            }]
        },
        {
            code: "define('id', ['a'], function(a) { });",
            errors: [{
                message: "a is never used",
                type: "Identifier"
            }]
        },
    ]
});
