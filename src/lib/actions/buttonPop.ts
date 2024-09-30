export function buttonPop(node: HTMLElement) {
	function handleClick() {
		node.style.transform = 'scale(0.95)';
		setTimeout(() => {
			node.style.transform = 'scale(1)';
		}, 100);
	}

	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('click', handleClick);
		}
	};
}
