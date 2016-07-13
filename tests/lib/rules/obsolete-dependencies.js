/**
 * @fileoverview -
 * @author obsolete-dependencies
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/obsolete-dependencies"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("obsolete-dependencies", rule, {

    valid: [
        "define(function() {});",
        "define(['a'], function() {});",
        "define('id', ['a'], function() {});",
        { code: "define(['A'], function() { });", options: [{ 'a': 'do not use' }, true] }
    ],

    invalid: [
        {
            code: "define(['A'], function() { });",
            options: [{ 'a': 'do not use' }],
            errors: [{
                message: "'a': do not use",
                type: "Literal"
            }]
        },
        {
            code: "define(['a'], function() { });",
            options: [{ 'a': 'do not use' }],
            errors: [{
                message: "'a': do not use",
                type: "Literal"
            }]
        },
        {
            code: "define('id', ['a'], function() { });",
            options: [{ 'a': 'do not use' }],
            errors: [{
                message: "'a': do not use",
                type: "Literal"
            }]
        },
    ]
});
