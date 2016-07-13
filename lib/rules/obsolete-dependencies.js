/**
 * @fileoverview -
 * @author obsolete-dependencies
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow usage of obsolete dependencies",
            category: "Maintainance",
            recommended: false
        },
        //fixable: "code",
        schema: [{
            type: "object",
        }, {
            type: "boolean"
        }]
    },
    create: function(context) {
        const options = context.options[0] || {};
        const caseSensitive = context.options[1];
        
        const rules = Object.keys(options).map(key => {
            return {
                match: function(dependency) {
                    return caseSensitive
                        ? dependency === key
                        : dependency.toLowerCase() === key.toLowerCase();
                },
                message: `'${ key }': ${ options[key] }` 
            };
        });
        
        function analyseDefine(defineNode) {
            const dependencyNode = defineNode.arguments.find(node => node.type === 'ArrayExpression');

            if (!dependencyNode) { return; } 

            dependencyNode.elements.forEach(dependency => {

                const matchingRule = rules.find(rule => rule.match(dependency.value));
                if (!matchingRule) { return; }

                context.report({
                    node: dependency,
                    message: matchingRule.message
                });

            });
        }

        return {
            "CallExpression:exit": function(node) {
                if (node.callee.name !== 'define') { return; }
                analyseDefine(node);
            }
        };
    }
};