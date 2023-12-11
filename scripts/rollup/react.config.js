import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';

const { name, module } = getPackageJSON('react');

// react 包的路径
const pakPath = resolvePkgPath(name);
// react 产物路径
const pakDistPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pakPath}/${module}`,
		output: {
			name: 'index.js',
			file: `${pakDistPath}/index.js`,
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pakPath,
				outputFolder: pakDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx-runtime
	{
		input: `${pakPath}/src/jsx.ts`,
		output: {
			name: 'jsx-runtime.js',
			file: `${pakDistPath}/jsx-runtime.js`,
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	},
	// jsx-dev-runtime
	{
		input: `${pakPath}/src/jsx.ts`,
		output: {
			name: 'jsx-dev-runtime.js',
			file: `${pakDistPath}/jsx-dev-runtime.js`,
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	}
];
