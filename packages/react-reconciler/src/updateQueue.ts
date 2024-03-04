import { Dispatch } from 'react/src/currentDispatcher';
import { Action } from 'shared/ReactTypes';
import { Lane } from './fiberLanes';

export interface Update<State> {
	action: Action<State>;
	lane: Lane;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	next: Update<any> | null;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
	dispatch: Dispatch<State> | null;
}

// 创建 update 实例
export const createUpdate = <State>(
	action: Action<State>,
	lane: Lane
): Update<State> => {
	return {
		action,
		lane,
		next: null
	};
};

export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null
		},
		dispatch: null
	} as UpdateQueue<State>;
};

// 往 updateQueue 里面增加 update
export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	const pending = updateQueue.shared.pending;
	if (pending === null) {
		// pending = a -> a
		update.next = update;
	} else {
		// pending = b -> a -> b
		// pending = c -> a -> b -> c
		update.next = pending.next;
		pending.next = update;
	}
	updateQueue.shared.pending = update;
};

// updateQueue 消费 update 的方法
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null,
	renderLane: Lane
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	const first = pendingUpdate?.next;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let pending = pendingUpdate?.next as Update<any>;
	do {
		const updateLane = pending.lane;
		if (updateLane === renderLane) {
			const action = pending.action;
			if (action instanceof Function) {
				// baseState 1 update (x) => 4x -> memoizedState 4

				baseState = action(baseState);
			} else {
				// baseState 1 update 2 -> memoizedState 2
				baseState = action;
			}
		} else {
			if (__DEV__) {
				console.error('不应该进入updateLane !== renderLane逻辑');
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		pending = pending.next as Update<any>;
	} while (pending !== first);

	return result;
};
