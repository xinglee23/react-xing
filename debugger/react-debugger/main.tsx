import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
	const [num, update] = useState(100);
	return (
		<ul onClick={() => update(50)}>
			{new Array(num).fill(0).map((_, i) => {
				return <Child key={i}>{i}</Child>;
			})}
		</ul>
	);
}

function Child({ children }) {
	const now = performance.now();
	// eslint-disable-next-line no-empty
	while (performance.now() - now < 4) {}
	return <li>{children}</li>;
}

// eslint-disable-next-line
const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
