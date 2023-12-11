/* eslint-disable @typescript-eslint/no-explicit-any */
// ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElement,
	ELementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'ReactXing'
	};

	return element;
};

export const jsx = (type: ELementType, config: any, ...mayChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop of props) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const mayChildrenLength = mayChildren.length;
	if (mayChildrenLength > 0) {
		if (mayChildrenLength === 1) {
			props.children = mayChildren[0];
		} else {
			props.children = mayChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;
