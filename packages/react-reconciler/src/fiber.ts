/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FunctionComponent,
	HostComponent,
	WorkTag,
	Fragment,
	ContextProvider
} from './workTags';
import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
import { Effect } from './fiberHooks';
import { Lanes, Lane, NoLane, NoLanes } from './fiberLanes';
import { CallbackNode } from 'scheduler';
import { REACT_PROVIDER_TYPE } from 'shared/ReactSymbols';

export class FiberNode {
	tag: WorkTag;
	key: Key; //  reactElement key
	type: any;
	stateNode: any; // HostComponent 保存到就是 div 这个 dom
	pendingProps: Props; // 当前 props 接下来有哪些 props 需要改变
	ref: Ref;

	return: null | FiberNode;
	sibling: null | FiberNode;
	child: null | FiberNode;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	deletions: FiberNode[] | null;

	lanes: Lanes;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key || null;
		this.stateNode = null;
		this.type = null;

		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 构成工作单元
		this.pendingProps = pendingProps; // 工作单元刚开始准备工作的 props
		this.memoizedProps = null; // 最终的 props
		this.memoizedState = null;

		this.alternate = null;
		// 副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags; // 子树中包含的flags
		this.updateQueue = null;
		this.deletions = null;
		this.lanes = NoLanes;
	}
}

export interface PendingPassiveEffects {
	unmount: Effect[];
	update: Effect[];
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null; // 递归更新完成后的 node
	pendingLanes: Lanes;
	finishedLane: Lane;
	pendingPassiveEffects: PendingPassiveEffects;

	callbackNode: CallbackNode | null;
	callbackPriority: Lane;

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
		this.pendingLanes = NoLanes;
		this.finishedLane = NoLane;

		this.callbackNode = null;
		this.callbackPriority = NoLane;

		this.pendingPassiveEffects = {
			unmount: [],
			update: []
		};
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;
	// 首屏渲染就是 null
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		// 清除副作用
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
		wip.deletions = null;
	}
	wip.type = current.type;
	wip.child = current.child;
	wip.updateQueue = current.updateQueue;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;
	wip.ref = current.ref;
	wip.lanes = current.lanes;

	return wip;
};

export function createFiberFromElement(
	element: ReactElementType,
	lanes: Lanes
): FiberNode {
	const { type, key, props, ref } = element;
	let fiberTag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		// <div> type 'div'
		fiberTag = HostComponent;
	} else if (
		typeof type === 'object' &&
		type.$$typeof === REACT_PROVIDER_TYPE
	) {
		fiberTag = ContextProvider;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型');
	}
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	fiber.lanes = lanes;
	fiber.ref = ref;
	return fiber;
}

export function createFiberFromFragment(elements: any[], key: Key): FiberNode {
	const fiber = new FiberNode(Fragment, elements, key);
	return fiber;
}
