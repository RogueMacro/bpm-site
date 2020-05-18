import React, { FC } from 'react'

import {
	motion,
	useViewportScroll,
	useTransform,
	useSpring,
} from 'framer-motion'

const Reads: FC = ({ children }) => {
	const { scrollYProgress } = useViewportScroll()
	const y = useTransform(scrollYProgress, [0, 0.9], [0, 1])
	const path = useSpring(y, { stiffness: 300, damping: 100000 })

	return (
		<>
			<svg
				className="reads"
				preserveAspectRatio="none"
				viewBox="0 0 100 10"
			>
				<motion.path
					fill="none"
					strokeWidth="20"
					stroke="var(--palet-3)"
					d="M 0, 0 h 100"
					style={{ pathLength: path }}
				></motion.path>
			</svg>
			{children}
		</>
	)
}

export default Reads
