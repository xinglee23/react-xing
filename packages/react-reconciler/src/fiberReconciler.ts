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
import { requestUpdateLane } from './fiberLanes';
import {
	unstable_ImmediatePriority,
	unstable_runWithPriority
} from 'scheduler';

// 创建整个应用的根结点，FiberRootNode，并将 FiberRootNode 和 hostRootNode 链接
// reactDOM.createRoot 调用 createContainer
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();

	return root;
}

// render 方法内部调用 updateContainer
export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	unstable_runWithPriority(unstable_ImmediatePriority, () => {
		const hostRootFiber = root.current;
		const lane = requestUpdateLane();
		const update = createUpdate<ReactElementType | null>(element, lane);
		enqueueUpdate(
			hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
			update
		);

		scheduleUpdateOnFiber(hostRootFiber, lane);
	});

	return element;
}
