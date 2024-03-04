// import { jsxDEV, jsx, isValidElement as isValidElementFn } from './src/jsx';
import { jsxDEV, isValidElement as isValidElementFn } from './src/jsx';
import currentDispatcher from './src/currentDispatcher';
import { Dispatcher, resolveDispatcher } from './src/currentDispatcher';

export const useState: Dispatcher['useState'] = (initialState) => {
	const dispatcher = resolveDispatcher();

	return dispatcher.useState(initialState);
};

export const useEffect: Dispatcher['useEffect'] = (create, deps) => {
	const dispatcher = resolveDispatcher();
	return dispatcher.useEffect(create, deps);
};

// 内部数据共享层
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
	currentDispatcher
};

export const version = '0.0.0';
// TODO 跟进环境来使用 jsx 或者 jsxDEV
export const createElement = jsxDEV;

export const isValidElement = isValidElementFn;
