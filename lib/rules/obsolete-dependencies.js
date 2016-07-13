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
            description: "force matching parameter name for dependenies",
            category: "Best Practices",
            recommended: true
        },
        //fixable: "code",
        schema: [{
            type: "object",
        }]
    },
    create: function(context) {
        const options = context.options[0] || {};

        function analyseDefine(defineNode) {
            const dependencyNode = defineNode.arguments.find(node => node.type === 'ArrayExpression')

            if (!dependencyNode) { return; } 

            dependencyNode.elements
                .filter(dependency => options[dependency.value])
                .forEach(dependency => {

                    context.report({
                        node: dependency,
                        message: `'${ dependency.value }': ${ options[dependency.value] }`
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