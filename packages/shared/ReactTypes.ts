/* eslint-disable @typescript-eslint/no-explicit-any */
export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ELementType = any;

export interface ReactElement {
	$$typeof: symbol | number;
	type: ELementType;
	key: Key;
	ref: Ref;
	props: Props;
	__mark: string;
}
