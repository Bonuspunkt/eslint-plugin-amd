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
        function extractName(dependency) {
            const pathLastPart = dependency.split(/\/|!/g).pop();
            const withoutExtension = pathLastPart.split('.')[0];
            return withoutExtension;
        }

        function analyseDefine(defineNode) {
            const dependencyNode = defineNode.arguments.find(node => node.type === 'ArrayExpression');
            if (!dependencyNode) { return; }
            const dependencies = dependencyNode.elements;
            const factoryNode = defineNode.arguments.find(node => node.type === 'FunctionExpression');
            if (!factoryNode) { return; }
            const parameters = factoryNode.params;

            const maxLength = Math.min(dependencies.length, parameters.length);

            for (var i = 0; i < maxLength; i++) {
                const parameter = parameters[i];
                const dependency = dependencies[i];
                if (parameter.type === 'ObjectPattern') { continue; }
                if (dependency.type !== 'Literal') { continue; }
                const dependencyName = extractName(dependency.value);
                const pattern = dependencyName.replace(/[^a-z0-9]/gi, '');
                const check = new RegExp(pattern, 'i');

                if (!check.test(parameter.name)) {
                    context.report({
                        node: parameter,
                        message: `'${dependency.value}' is mapped to ${parameter.name}`
                    });
                }
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
