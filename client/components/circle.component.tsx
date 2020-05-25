import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
export const Circle: React.FC<HTMLMotionProps<'div'> & {
	radius: number;
	color: string;
	border?: string;
}> = ({ radius, color, border, children, ...porps }) => (<motion.div {...porps} style={{
	width: `${radius * 2}px`,
	height: `${radius * 2}px`,
	borderRadius: border || '100000px',
	backgroundColor: color,
}}>
	{children}
</motion.div>);

export default Circle