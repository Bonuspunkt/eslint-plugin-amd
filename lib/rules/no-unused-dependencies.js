/**
 * @fileoverview no unused required files
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow unused dependencies",
            category: "Best Practices",
            recommended: true
        },
        //fixable: "code",
        schema: [] // no options
    },
    create: function(context) {
        function findUnused(program) {

            const tokens = program.tokens;

            const unused = program.body
                .filter(exp =>
                    exp.type === 'ExpressionStatement' &&
                    exp.expression.type === 'CallExpression' &&
                    exp.expression.callee.name === 'define')
                .map(exp =>
                    exp.expression.arguments
                        .filter(arg => arg.type === 'FunctionExpression')
                        .map(arg => arg.params)
                        .reduce((prev, curr) => prev.concat(curr), [])
                )
                .reduce((prev, curr) => prev.concat(curr), [])
                .map(param => {
                    return {
                        param: param,
                        count: tokens.filter(
                            token =>
                                /^(JSX)?Identifier$/.test(token.type) &&
                                token.value === param.name
                            ).length
                    };
                })
                .filter(ref => ref.count === 1)

            return unused;
        }

        return {
            "Program:exit": function(programNode) {
                const unused = findUnused(programNode);
                unused.forEach(
                    u => context.report({
                        node: u.param,
                        message: `${u.param.name} is never used`
                    })
                );
            }
        };
    }
};
