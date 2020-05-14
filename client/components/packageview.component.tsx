import React from 'react'
import { company, random } from 'faker'

export default function packageview() {
	return (
		<div>
			<h3>{company.bs()}</h3>
		</div>
	)
}
