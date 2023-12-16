export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; // 项目挂载的根节点，对应的 fiber 节点类型
export const HostComponent = 5; // div 节点
export const HostText = 6; // <div>131</div>
