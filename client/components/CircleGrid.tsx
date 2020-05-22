import React, { FC } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Circle from './Circle';
import { range } from 'lodash';
export const CircleGrid: FC<HTMLMotionProps<'div'> & {
	columns: number;
	circles: number;
	radius: number;
	color: string;
	gap: number;
	border?: string;
}> = ({ columns, circles, radius, color, gap, border, ...porps }) => (<motion.div {...porps} style={{
	display: 'grid',
	gridTemplateColumns: `repeat(${columns}, 1fr)`,
	gap: `${gap}px`,
}}>
	{range(0, circles).map((i) => (<Circle color={color} radius={radius} key={i} border={border} />))}
</motion.div>);

export default CircleGrid
