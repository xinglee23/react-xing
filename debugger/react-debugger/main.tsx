import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [num, setNum] = useState(100);

	return num === 3 ? <Child /> : <div>{num}</div>;
	// return <div onClickCapture={() => setNum(num + 1)}>{num}</div>;
	// return <div>123</div>;
}

function Child() {
	return <div>big-react</div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
