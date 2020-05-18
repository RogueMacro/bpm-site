import React from 'react'

import Style from '../../client/style/guide.module.scss'

function Command(props: { text: string }) {
	const index = props.text.indexOf(' ')
	const name = props.text.substr(0, index)
	const args = props.text.substr(index + 1)
	return (
		<code>
			<span className="command">{name}</span> {args}
		</code>
	)
}

export default function () {
	return (
		<>
			<h1>Guide</h1>
			<h2>CLI (Command Line Tool)</h2>
			<hr />
			<h3>Installation</h3>
			<p>
				First of all, you need to install the CLI. If you haven't done
				that already visit the <a href="/downloads">downloads page</a>{' '}
				to download it.
			</p>
			<h3>How to use</h3>
			<p>
				You can run <Command text="bpm <command> [arguments]" /> from
				the command line to run a specific command. You can also run bpm
				from the command line or start bpm.exe to open the bpm shell. In
				the shell you can run different commands, i.e.{' '}
				<Command text="bpm> install <package>" />. Note: After using{' '}
				<Command text="bpm add <package>" /> remember to add the package
				as a dependency to your project from the IDE.
			</p>
			<h3>Arguments</h3>
			<p>
				{' '}
				Arguments prefixed with a <b>-</b> (dash) are flag arguments,
				which doesn't have a value. Flag arguments come last after value
				arguments. All other arguments (both required and optional) are
				value arguments. Their value can be passed at the index like
				shown in their syntax, or by doing{' '}
				<code>&lt;argument&gt;=&lt;value&gt;</code> somewhere after the
				indexed arguments i.e. bpm install{' '}
				<code>package=&lt;PackageName&gt;</code>. Angled brackets{' '}
				<b>-</b> <code>&lt;argument&gt;</code> <b>-</b> means the
				argument is required. Square brackets <b>-</b>{' '}
				<code>[argument]</code> <b>-</b> means the argument is optional.
			</p>
			<h3>Commands</h3>
			<p>
				<Command text="bpm install <package> [-global] [-force]" />
				<br />
				<br />
				Clones a package repository to your computer.
				<br />
				<ul>
					<li>
						<b>package:</b> The name of the package
					</li>
					<li>
						<b>global:</b> Installs the package for all users.
					</li>
					<li>
						<b>force:</b> Installs the package without any prompts.
					</li>
				</ul>
				<br />
				<Command text="bpm upgrade <package> [version] [-global]" />
				<br />
				<br />
				Upgrades the package to a new version.
				<br />
				<ul>
					<li>
						<b>package:</b> The name of the package
					</li>
					<li>
						<b>version:</b> The new version to install. (Not
						supported yet). Defaults to latest.
					</li>
					<li>
						<b>global:</b> Installs the package for all users.
					</li>
				</ul>
				<br />
				<Command text="bpm add <package> [path] [-global] [-copy]" />
				<br />
				<br />
				Adds the package to a workspace. Note: The package will be
				locked in that workspace to prevent unintentional changes. You
				can use -copy the make a unlocked copy of the package just
				within that workspace, or unlock it manually inside the IDE to
				edit the installed package. Using -copy will copy the package to{' '}
				<code>&lt;ProjectName&gt;/packages/&lt;PackageName&gt;</code>.
				<br />
				<ul>
					<li>
						<b>package:</b> The name of the package
					</li>
					<li>
						<b>path:</b> The path to the workspace. Defaults to the
						current directory.
					</li>
					<li>
						<b>global:</b> Installs the package for all users.
					</li>
					<li>
						<b>copy:</b>Makes a copy of the package within that
						workspace.
					</li>
				</ul>
				<br />
			</p>
			<h2>Package Index</h2>
			<p>
				Check out our <a href="/#faq">FAQ</a>.
			</p>
		</>
	)
}
