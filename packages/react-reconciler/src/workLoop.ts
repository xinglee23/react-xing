import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

// 当前 workInprogress 指向需要遍历的 workInProgress
let workInprogress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInprogress = createWorkInProgress(root.current, {});
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(fiber);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInprogress = sibling;
			return;
		}

		node = node.return;
	} while (node !== null);
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInprogress = next as unknown as FiberNode | null;
	}
}

function workLoop() {
	while (workInprogress !== null) {
		performUnitOfWork(workInprogress);
	}
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// 调度功能
	// fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	// 开始更新流程
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}

	return null;
}

function renderRoot(root: FiberRootNode) {
	//  初始化
	prepareFreshStack(root);
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('work loop exec error', e);
			workInprogress = null;
		}
	} while (true);
}
