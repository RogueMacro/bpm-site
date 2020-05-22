import React, { useEffect, useState, useMemo, FC } from 'react'
import dynamic from 'next/dynamic'

import {
	motion,
	useTransform,
	useViewportScroll,
	MotionStyle,
	HTMLMotionProps,
} from 'framer-motion'
import Circle from '../client/components/Circle'

import {
	setSmartInterval,
	removeSmartInterval,
} from '../client/utils/smartInterval'
import { company } from 'faker'
import { range, inRange } from 'lodash'
import sortWith from '../client/utils/sort'

import useMediaQuery from '../client/hooks/useScreenMediaquery'
import {
	useRandom,
	useRandoms,
	randomBool,
	anySignRandom,
} from '../client/hooks/useStatedRandom'
import useViewport from '../client/hooks/useViewport'

import Style from '../client/style/landing.module.scss'
import { CircleGrid } from '../client/components/CircleGrid'

type point = [number, number]
type bound = [point, point]

function boundingBoxIntersect(a: bound, b: bound) {
	const boundToPoint = (bound: bound): [point, point, point, point] => [
		[bound[0][0], bound[0][0]],
		[bound[0][1], bound[0][1]],
		[bound[1][0], bound[1][0]],
		[bound[1][1], bound[1][1]],
	]

	const vertexInBound = (vertex: point, bound: bound) =>
		inRange(vertex[0], bound[0][0], bound[1][0]) &&
		inRange(vertex[1], bound[0][1], bound[1][1])

	for (const vertex of boundToPoint(b))
		if (vertexInBound(vertex, a)) return true

	return false
}

const Positioner: FC<
	HTMLMotionProps<'div'> & {
		distance: number
		x: number
		y: number
		height: number
		start?: number
	}
> = ({ children, x, y: rootY, distance, height, start, style, ...props }) => {
	const { scrollY } = useViewportScroll()
	const y = useTransform(
		scrollY,
		[start || 0, height + (start || 0)],
		[0, 1],
		{
			ease: (pre) => pre * distance + rootY,
		}
	)

	return (
		<motion.div {...props} style={{ ...style, x, y }}>
			{children}
		</motion.div>
	)
}

const Underlay = ({
	width,
	height,
	isMobile,
	textBound,
}: {
	width: number
	height: number
	isMobile: boolean
	textBound: bound
}) => (
	<div className={`${Style.underlay} center`}>
		{range(15).map((index) => {
			let [
				columnRandom,
				rowRandom,
				colorRandom,
				radiusRandom,
				gapRandom,
			] = useRandoms(5)
			let isGrid = randomBool(-0.1)
			const colors = [1, 2, 3, 5]
			const numCol = Math.round(colorRandom * colors.length)

			const x = anySignRandom() * width * 50
			const y = anySignRandom() * height * 50 - 80
			const radius = isGrid
				? radiusRandom * 5 + 3
				: radiusRandom * 50 + 10

			const columns = Math.round(columnRandom * 7) + 3
			const rows = Math.round(rowRandom * 7) + 3
			const gap = gapRandom * 50 + 10

			let color = colors[Math.round(colorRandom * colors.length)]

			const thisBound: bound = isGrid
				? [
						[x, y],
						[
							x + radius * columns + gap * columns - 1,
							y + radius * rows + gap * rows - 1,
						],
				  ]
				: [
						[x, y],
						[x + 2 * radius, y + 2 * radius],
				  ]

			if (boundingBoxIntersect(textBound, thisBound)) color = colors[0]

			return (
				<Positioner
					style={{ zIndex: 0 }}
					height={height * 100 * (isMobile ? 3 : 1)}
					distance={(Math.random() * 800 + 400) * (isMobile ? 3 : 1)}
					x={x}
					y={y}
					key={index}
				>
					{isGrid ? (
						<CircleGrid
							circles={columns * rows}
							columns={columns}
							radius={radius}
							gap={gap}
							color={`var(--palet-${color})`}
							border={randomBool() ? '0px' : '10000px'}
						/>
					) : (
						<Circle
							radius={radius}
							color={`var(--palet-${color})`}
						/>
					)}
				</Positioner>
			)
		})}
	</div>
)

function Header({
	height,
	width,
	isMobile,
}: {
	height: number
	width: number
	isMobile: boolean
}) {
	// 308 wide 175 hight
	const textBound: bound = [
		[width * 50 - 150, (width * 85) / 2 + 100],
		[width * 50 + 150, (width * 85) / 2 - 100],
	]
	return (
		<div className={`${Style.header} center`}>
			<h1>BPM</h1>
			<sub className="header-sub">BEEF PACKAGE MANAGER</sub>
			<a href="#about" className={Style.navIcon}>
				arrow_back_ios
			</a>
			<Underlay {...{ width, height, isMobile, textBound }} />
		</div>
	)
}

function About({
	height,
	width,
	isMobile,
}: {
	height: number
	width: number
	isMobile: boolean
}) {
	const { scrollY } = useViewportScroll()

	const easeInOutCubic = (x: number) =>
		x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2

	const animationRange = isMobile
		? [height * 70, height * 100]
		: [height * 50, height * 90]
	const x = useTransform(scrollY, animationRange, [100, 0], {
		ease: (x) => easeInOutCubic(x),
	})
	const opacity = useTransform(scrollY, animationRange, [0, 1])

	return (
		<div
			className={`${Style.about} center-grid ${Style.section} ${Style.noPad}`}
			id="about"
		>
			<div className={`${Style.animation}`}>
				{range(0, 10).map((i) => {
					const [distanceRandom] = useRandoms(2)

					const [currentPackage, setCurrentPackage] = useState(
						company.bs()
					)

					const [getting, setGetting] = useState(Math.random() > 0.5)

					useEffect(() => {
						setTimeout(() => {
							if (getting) {
								setCurrentPackage(company.bs())
							}
							setGetting(!getting)
						}, Math.random() * 4000 + 3000)

						return () => {}
					}, [getting])

					const y = useMemo(() => (getting ? -0 : 100), [getting])

					return (
						<Positioner
							distance={distanceRandom * 100}
							height={140 * height}
							start={height * 20}
							x={0}
							y={0}
						>
							<Circle
								color="var(--palet-3)"
								radius={100}
								border="0"
								animate={getting ? 'top' : 'bottom'}
								transition={{ duration: 3, ease: 'anticipate' }}
								variants={{
									top: { y: 550 },
									bottom: { y: -300 },
								}}
							>
								{
									<div
										className={`${Style.animationChild} center`}
									>
										<h2>
											{getting ? 'fetching' : 'sending'}
										</h2>
										<p>{currentPackage}</p>
									</div>
								}
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
	const isMobile = useMediaQuery(1000, 0, 'or')

	const { vh: height, vw: width } = useViewport()
	return (
		<div style={{ height: '300vh', overflow: 'hidden' }}>
			<Header height={height} width={width} isMobile={isMobile} />
			<About height={height} width={width} isMobile={isMobile} />
			<FAQ />
		</div>
	)
}
