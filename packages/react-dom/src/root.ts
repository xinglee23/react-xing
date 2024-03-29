import {
	createContainer,
	updateContainer
} from 'react-reconciler/src/fiberReconciler';
import { ReactElementType } from 'shared/ReactTypes';
import { Container } from './hostConfig';
import { initEvent } from './SyntheticEvent';

export function createRoot(container: Container) {
	const root = createContainer(container);
	console.log('--root--', root);

	return {
		render(element: ReactElementType) {
			console.log('--element--', element);
			initEvent(container, 'click');
			return updateContainer(element, root);
		}
	};
}
