import React, { FC } from 'react'

import Style from '../../client/style/reads-root.module.scss'

export default function () {
	const Read: FC<{ title: string; href: string; icon?: string }> = ({
		children,
		title,
		href,
		icon,
	}) => (
		<li>
			<a href={href} className='center'>
				<div className={`${Style.card}`}>
					<div
						style={{
							backgroundImage: `url(${icon || '/favicon.ico'})`,
						}}
					/>
					<h1>{title}</h1>
					<p>{children}</p>
				</div>
			</a>
		</li>
	)

	return (
		<div className={Style.container}>
			<ul className={'center'}>
				<Read
					title="guide"
					href="/reads/guide"
				>
					A simple introduction to install and use the GRILL system
				</Read>
				<Read
					title="guide"
					href="/reads/guide"
				>
					A simple introduction to install and use the GRILL system
				</Read>
			</ul>
		</div>
	)
}
