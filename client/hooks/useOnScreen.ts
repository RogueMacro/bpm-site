import { useEffect, useState, MutableRefObject } from 'react'

export default <T extends Element>(
	ref: MutableRefObject<T>,
	config: IntersectionObserverInit | undefined
) => {
	const [intersecting, setIntersecting] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting)
		}, config)

		if (ref.current) observer.observe(ref.current)
		return observer.unobserve(ref.current)
	}, [])
	return intersecting
}
