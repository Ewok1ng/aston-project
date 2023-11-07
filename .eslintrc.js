module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:@typescript-eslint/recommended' // Uses the recommended rules from the @typescript-eslint/eslint-plugin
	],
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			arrowFunctions: true
		}
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src']
			}
		}
	},
	rules: {
		'comma-dangle': ['error', 'never'], // https://eslint.org/docs/rules/comma-dangle
		'function-paren-newline': 'off', // https://eslint.org/docs/rules/function-paren-newline
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'react/jsx-no-useless-fragment': 'error',
		'no-unused-expressions': 'error',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'jsx-quotes': ['error', 'prefer-double'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type'
				],
				'newlines-between': 'always-and-inside-groups'
			}
		]
	}
};
