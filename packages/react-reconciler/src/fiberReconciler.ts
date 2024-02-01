import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { ReactElementType } from 'shared/ReactTypes';
import { HostRoot } from './workTags';
import { scheduleUpdateOnFiber } from './workLoop';
import {
	UpdateQueue,
	createUpdateQueue,
	createUpdate,
	enqueueUpdate
} from './updateQueue';

// 创建整个应用的根结点，FiberRootNode，并将 FIberRootNode 和hostRootNode 链接
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();

	return root;
}

export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);

	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
