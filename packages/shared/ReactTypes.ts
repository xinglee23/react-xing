/* eslint-disable @typescript-eslint/no-explicit-any */
export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ELementType = any;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ELementType;
	key: Key;
	ref: Ref;
	props: Props;
	__mark: string;
}

export type Action<State> = State | ((prevState: State) => State);
