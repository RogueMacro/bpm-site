import React, { useEffect } from 'react'

import {
	motion,
	useTransform,
	useViewportScroll,
	MotionStyle,
} from 'framer-motion'

import { setRInterval } from '../client/utils/smartInterval'
import { company } from 'faker'
import { range } from 'lodash'

import useMediaQuery from '../client/hooks/useScreenMediaquery'
import {
	useRandom,
	useRandoms,
	randomBool,
	anySignRandom,
} from '../client/hooks/useStatedRandom'
import useViewport from '../client/hooks/useViewport'

import Style from '../client/style/landing.module.scss'

const Circle: React.FC<{
	radius: number
	color: string
	border?: string
}> = ({ radius, color, border, children }) => (
	<div
		style={{
			width: `${radius * 2}px`,
			height: `${radius * 2}px`,
			borderRadius: border || '100000px',
			backgroundColor: color,
		}}
	>
		{children}
	</div>
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
	style?: MotionStyle
}> = ({ children, x, y, distance, height, start, style }) => {
	const { scrollY } = useViewportScroll()
	const transform = useTransform(
		scrollY,
		[start || 0, height + (start || 0)],
		[0, 1],
		{
			ease: (pre) => pre * distance + y,
		}
	)

	return (
		<motion.div style={{ ...style, x: x, y: transform }}>
			{children}
		</motion.div>
	)
}

function Header({ height, width }: { height: number; width: number }) {
	const isMobile = useMediaQuery(1000, 0, 'or')

	return (
		<div className={`${Style.header} center`}>
			<h1>BPM</h1>
			<sub className="header-sub">BEEF PACKAGE MANAGER</sub>
			<a href="#about" className={Style.navIcon}>
				arrow_back_ios
			</a>

			<div className={`${Style.underlay} center`}>
				{range(15).map((index) => {
					const [
						columnRandom,
						rowRandom,
						colorRandom,
						radiusRandom,
						gapRandom,
					] = useRandoms(5)

					const columns = Math.round(columnRandom * 7) + 3
					const rows = Math.round(rowRandom * 7) + 3

					const colors = [1, 2, 3, 5]
					const color =
						colors[Math.round(colorRandom * colors.length)]

					return (
						<Positioner
							style={{ zIndex: 0 }}
							height={height * 100 * (isMobile ? 2 : 1)}
							distance={
								(Math.random() * 800 + 400) * (isMobile ? 2 : 1)
							}
							x={anySignRandom() * width * 50}
							y={anySignRandom() * height * 50 - 80}
							key={index}
						>
							{randomBool(-0.1) ? (
								<CircleGrid
									circles={columns * rows}
									columns={columns}
									radius={radiusRandom * 5 + 3}
									gap={gapRandom * 50 + 10}
									color={`var(--palet-${color})`}
									border={randomBool() ? '0px' : '10000px'}
								/>
							) : (
								<Circle
									radius={radiusRandom * 50 + 10}
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

	const easeInOutCubic = (x: number) =>
		x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2

	const animationRange = [height * 50, height * 90]
	const x = useTransform(scrollY, animationRange, [100, 0], {
		ease: (x) => easeInOutCubic(x),
	})
	const opacity = useTransform(scrollY, animationRange, [0, 1])

	return (
		<div
			className={`${Style.about} center-grid ${Style.section} ${Style.noPad}`}
			id="about"
		>
			<div className={Style.animation}>
				{range(0, 10).map((i) => {
					const [
						distanceRandom,
						xRandom,
						yRandom,
						radiusRandom,
					] = useRandoms(4)

					return (
						<Positioner
							distance={distanceRandom * 100}
							height={140 * height}
							start={height * 20}
							x={xRandom * 50 * width}
							y={yRandom * 0}
						>
							<Circle
								color="var(--palet-3)"
								radius={radiusRandom * 50 + 50}
								border="0"
							>
								{company.bs()}
							</Circle>
						</Positioner>
					)
				})}
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
					comes with a Package Index, CLI and GraphQL API. Help build
					a community around the Beef programming language. Create,
					share, browse and install libraries easily using the BPM
					CLI. <br />
					<a href="/guide">Read our guide</a> to get started.
				</motion.p>
			</div>
			{/* Slogans:
			- Bringing the Beef community together!
			- Create and share! 
			- Sharing is caring!
			*/}
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
					<a>Download the BPM CLI</a> and read{' '}
					<a href="/guide">guide</a> to get started.
				</p>
			</div>
		</div>
	)
}

export default function index() {
	const { vh: height, vw: width } = useViewport()
	return (
		<div style={{height:'300vh', overflow:'hidden'}}>
			<Header height={height} width={width} />
			<Features height={height} width={width} />
			<FAQ />
		</div>
	)
}
