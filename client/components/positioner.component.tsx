import React, { FC } from 'react';
import { motion, useTransform, useViewportScroll, HTMLMotionProps } from 'framer-motion';
export const Positioner: FC<HTMLMotionProps<'div'> & {
	distance: number;
	x: number;
	y: number;
	height: number;
	start?: number;
}> = ({ children, x, y: rootY, distance, height, start, style, ...props }) => {
	const { scrollY } = useViewportScroll();
	const y = useTransform(scrollY, [start || 0, height + (start || 0)], [0, 1], {
		ease: (pre) => pre * distance + rootY,
	});
	return (<motion.div {...props} style={{ ...style, x, y }}>
		{children}
	</motion.div>);
};

export default Positioner