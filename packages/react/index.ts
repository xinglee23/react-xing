import { jsxDEV } from './src/jsx';
import currentDispather from './src/currentDispatcher';
import { Dispatcher, resolveDispatcher } from './src/currentDispatcher';

export const useState: Dispatcher['useState'] = (initialState) => {
	const dispatcher = resolveDispatcher();

	return dispatcher.useState(initialState);
};

// 内部数据共享层
export const __SECERT_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
	currentDispather
};

export default {
	version: '0.0.0',
	createElement: jsxDEV
};
