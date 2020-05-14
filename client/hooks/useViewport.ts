import { useEffect, useState } from 'react'
export default (): {
	[unit in 'vh' | 'vw' | 'vmin' | 'vmax']: number
} => {
	const [vh, setVh] = useState(300)
	const [vw, setVw] = useState(300)
	useEffect(() => {
		setVh(window.innerHeight / 100)
		setVw(window.innerWidth / 100)
		window.addEventListener('resize', () => {
			setVh(window.innerHeight / 100)
			setVw(window.innerWidth / 100)
		})
	}, [])
	return { vh, vw, vmin: Math.min(vh, vw), vmax: Math.max(vh, vw) }
}
