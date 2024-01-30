import {
	createContainer,
	unpdateContainer
} from 'react-reconciler/src/fiberReconciler';
import { ReactElementType } from 'shared/ReactTypes';
import { Container } from './hostConfig';

export function createRoot(container: Container) {
	const root = createContainer(container);

	console.log('container', root);

	return {
		render(element: ReactElementType) {
			unpdateContainer(element, root);
		}
	};
}
