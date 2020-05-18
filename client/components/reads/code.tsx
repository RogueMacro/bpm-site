import React from 'react';
export function Command(props: {
	text: string;
}) {
	const index = props.text.indexOf(' ');
	const name = props.text.substr(0, index);
	const args = props.text.substr(index + 1);
	return (<code>
		<span className="command">{name}</span> {args}
	</code>);
}
