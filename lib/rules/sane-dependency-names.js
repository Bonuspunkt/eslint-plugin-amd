/**
 * @fileoverview check to keep dependency name inline with parameter name
 * @author 
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
        schema: [] // no options
    },
    create: function(context) {
        function analyseDefine(defineNode) {
            const dependencyNode = defineNode.arguments.find(node => node.type === 'ArrayExpression');
            if (!dependencyNode) { return; }

            const dependencies = dependencyNode.elements;
            const parameters = defineNode.arguments.find(node => node.type === 'FunctionExpression').params;

            const maxLength = Math.min(dependencies.length, parameters.length);

            for (var i = 0; i < maxLength; i++) {
                const parameter = parameters[i];
                const dependency = dependencies[i];
                const dependencyName = dependency.value.split(/\//g).pop();
                const pattern = dependencyName.replace(/[^a-z0-9]/gi, '');
                const check = new RegExp(pattern, 'i');

                if (check.test(parameter.name)) { return; }

                context.report({
                    node: parameter,
                    message: `'${dependency.value}' is mapped to ${parameter.name}`
                });
            }
        }

        return {
            "CallExpression:exit": function(node) {
                if (node.callee.name !== 'define') { return; }
                analyseDefine(node);
            }
        };
    }
};