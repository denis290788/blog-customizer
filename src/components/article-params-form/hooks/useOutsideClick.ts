import { useEffect, useRef } from 'react';

export type OnClick = () => void;

export const useOutsideClick = (onOutsideClick: OnClick) => {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [onOutsideClick]);

	return ref;
};
