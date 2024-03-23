import { ReactContext } from 'shared/ReactTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prevContextValue: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prevContextValueStack: any[] = [];

export function pushProvider<T>(context: ReactContext<T>, newValue: T) {
	prevContextValueStack.push(prevContextValue);

	prevContextValue = context._currentValue;
	context._currentValue = newValue;
}

export function popProvider<T>(context: ReactContext<T>) {
	context._currentValue = prevContextValue;

	prevContextValue = prevContextValueStack.pop();
}
