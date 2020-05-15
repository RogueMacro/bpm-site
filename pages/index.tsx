import React from 'react'

import { motion, useTransform, useViewportScroll } from 'framer-motion'

import { range } from 'lodash'

import Style from '../client/style/landing.module.scss'
import useViewport from '../client/hooks/useViewport'

const Circle = ({
	radius,
	color,
	border,
}: {
	radius: number
	color: string
	border?: string
}) => (
	<div
		style={{
			width: `${radius * 2}px`,
			height: `${radius * 2}px`,
			borderRadius: border || '100000px',
			backgroundColor: color,
		}}
	/>
)

const CircleGrid = ({
	columns,
	circles,
	radius,
	color,
	gap,
	border,
}: {
	columns: number
	circles: number
	radius: number
	color: string
	gap: number
	border?: string
}) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: `repeat(${columns}, 1fr)`,
			gap: `${gap}px`,
		}}
	>
		{range(0, circles).map((i) => (
			<Circle color={color} radius={radius} key={i} border={border} />
		))}
	</div>
)

const Positioner: React.FC<{
	distance: number
	x: number
	y: number
	height: number
	start?: number
}> = ({ children, x, y, distance, height, start }) => {
	const { scrollY } = useViewportScroll()
	const transform = useTransform(
		scrollY,
		[start || 0, height + (start || 0)],
		[0, 1],
		{
			ease: (pre) => pre * distance + y,
		}
	)

	return <motion.div style={{ x: x, y: transform }}>{children}</motion.div>
}

function Header({ height, width }: { height: number; width: number }) {
	return (
		<div className={`${Style.header} center`}>
			<h1>BPM</h1>
			<sub className="header-sub">BEEF PACKAGE MANAGER</sub>
			<a href="#about" className={Style.navIcon}>
				arrow_back_ios
			</a>

			<div className={`${Style.underlay} center`}>
				{range(15).map((index) => {
					const randomBool = (bias?: number) =>
						Math.round(Math.random() - (bias || 0))

					const anySignRandom = () => (Math.random() - 0.5) * 2

					const columns = Math.round(Math.random() * 7) + 3
					const rows = Math.round(Math.random() * 7) + 3

					const colors = [1, 2, 3, 5]
					const color =
						colors[Math.round(Math.random() * colors.length)]

					return (
						<Positioner
							height={height * 100}
							distance={Math.random() * 800 + 400}
							x={anySignRandom() * width * 50}
							y={anySignRandom() * height * 50 - 80}
							key={index}
						>
							{randomBool(-0.1) ? (
								<CircleGrid
									circles={columns * rows}
									columns={columns}
									radius={Math.random() * 5 + 3}
									gap={Math.random() * 50 + 10}
									color={`var(--palet-${color})`}
									border={randomBool() ? '0px' : '10000px'}
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
	)
}

function Features({ height, width }: { height: number; width: number }) {
	const { scrollY } = useViewportScroll()

	const animationRange = [height * 50, height * 100]
	const x = useTransform(scrollY, animationRange, [100, 0])
	const opacity = useTransform(scrollY, animationRange, [0, 1])

	return (
		<div
			className={`${Style.about} center-grid ${Style.section} ${Style.noPad}`}
			id="about"
		>
			<div>
				{range(0, 50).map(() => (
					<Positioner
						distance={Math.random() * 1000}
						height={150 * height}
						start={height * 50}
						x={Math.random() * 30 * width - 100}
						y={Math.random() * 25 * height - 500}
					>
						<Circle
							color="var(--palet-3)"
							radius={Math.random() * 100}
							border='0'
						/>
					</Positioner>
				))}
			</div>
			<div className="center">
				<h1>About</h1>
				<motion.p
					style={{
						x,
						opacity,
					}}
				>
					BPM is a package manager for Beef programming language. It
					comes packaged with a Package Index, CLI and GraphQL API.
				</motion.p>
			</div>
			{/* <h2>Slogans:</h2>
			<p>Bringing the Beef community together</p>
			<p>Create and share!</p> */}
		</div>
	)
}

function FAQ() {
	return (
		<div className={`${Style.section}`} id="faq">
			<h1>FAQ</h1>
			<div>
				<h2>How do I register my package?</h2>
				<p>
					Login with GitHub, go to Manage Packages and hit the plus
					sign.
				</p>
				<h2>How do I install a package?</h2>
				<p>
					<a>Download the BPM CLI</a> and read the <a>How To</a> in
					our guide.
				</p>
			</div>
		</div>
	)
}

export default function index() {
	const { vh: height, vw: width } = useViewport()
	return (
		<>
			<Header height={height} width={width} />
			<Features height={height} width={width} />
			<FAQ />
		</>
	)
}
