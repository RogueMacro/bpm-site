import React, { useEffect, useState } from 'react'

import { motion, useTransform, useViewportScroll } from 'framer-motion'

import { range } from 'lodash'

import Style from '../client/style/landing.module.scss'

const useHeight = () => {
	const [height, setHeight] = useState(300)
	useEffect(() => {
		setHeight(window.innerHeight)
	}, [])
	return height
}

const Circle = ({ radius, color }: { radius: number; color: string }) => (
	<div
		style={{
			width: `${radius * 2}px`,
			height: `${radius * 2}px`,
		}}
	>
		<svg>
			<circle cx={radius} cy={radius} r={radius} fill={color} />
		</svg>
	</div>
)

const CircleGrid = ({
	columns,
	circles,
	radius,
	color,
	gap,
}: {
	columns: number
	circles: number
	radius: number
	color: string
	gap: number
}) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: `repeat(${columns}, 1fr)`,
			gap: `${gap}px`,
			overflow: 'hidden',
		}}
	>
		{range(0, circles).map((i) => (
			<Circle color={color} radius={radius} key={i} />
		))}
	</div>
)

const Positioner: React.FC<{
	distance: number
	x: number
	y: number
	height: number
}> = ({ children, x, y, distance, height }) => {
	const { scrollY } = useViewportScroll()
	const transform = useTransform(scrollY, [0, height], [0, 1], {
		ease: (pre) => pre * distance + y,
	})

	return <motion.div style={{ x: x, y: transform }}>{children}</motion.div>
}

export default function index() {
	const height = useHeight()

	return (
		<>
			<div className={`${Style.header} center`}>
				<h1>BPM</h1>
				<sub className="header-sub">BEEF PACKAGE MANAGER</sub>
				<a href="#about" className={Style.navIcon}>
					arrow_back_ios
				</a>

				<div className={`${Style.underlay} center`}>
					{range(15).map((index) => {
						const randomBool = () => Math.round(Math.random() + 0.3)

						const anySignRandom = () => (Math.random() - 0.5) * 2

						const columns = Math.round(Math.random() * 10)
						const rows = Math.round(Math.random() * 10)

						const color = (Math.round(
							Math.sin(Math.random() * Math.PI) ** 2 * 5
						)+1)%5

						return (
							<Positioner
								height={height}
								distance={Math.random() * 400 + 400}
								x={anySignRandom() * height}
								y={anySignRandom() * 300}
								key={index}
							>
								{randomBool() ? (
									<CircleGrid
										circles={columns * rows}
										columns={columns}
										radius={Math.random() * 10 + 2}
										gap={Math.random() * 40}
										color={`var(--palet-${color})`}
									/>
								) : (
									<Circle
										radius={Math.random() * 50 + 10}
										color={`var(--palet-${color})`}
									/>
								)}
							</Positioner>
						)
					})}
				</div>
			</div>
			<div className={`${Style.section} ${Style.about}`} id="about">
				<h1>About</h1>
				<p>
					BPM is a package manager for Beef programming language. It
					comes packaged with a Package Index, CLI and GraphQL API.
				</p>
				<h2>Slogans:</h2>
				<p>Bringing the Beef community together</p>
				<p>Create and share!</p>
			</div>
			<div className={`${Style.section}`} id="faq">
				<h1>FAQ</h1>
				<div>
					<h2>How do I register my package?</h2>
					<p>
						Login with GitHub, go to Manage Packages and hit the
						plus sign.
					</p>
					<h2>How do I install a package?</h2>
					<p>
						<a>Download the BPM CLI</a> and read the <a>How To</a>{' '}
						in our guide.
					</p>
				</div>
			</div>
		</>
	)
}
