import React from 'react'

import Style from '../client/style/guide.module.scss'

export default function () {
	return (
		<div className={`${Style.guide}`}>
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
				You can run{' '}
				<code>
					<span className="command">bpm</span> &lt;command&gt;
					[arguments]
				</code>{' '}
				from the command line to run a specific command. You can also
				run bpm from the command line or start bpm.exe to open the bpm
				shell. In the shell you can run different commands, i.e. bpm>
				install &ltpackage&gt. Note: After using bpm add &ltpackage&gt
				remember to add the package as a dependency to your project from
				the IDE. Arguments Arguments prefixed with a - (dash) are flag
				arguments, which doesn't have a value. Flag arguments come last
				after value arguments. All other arguments (both required and
				optional) are value arguments. Their value can be passed at the
				index like shown in their syntax, or by doing
				&ltargument>=&ltvalue&gt somewhere after indexed arguments i.e.
				bpm install package=&ltPackageName&gt. &ltargument> means the
				argument is required. [argument] means the argument is optional.
				Commands bpm install &ltpackage&gt [-global] [-force] Clones a
				package repository to your computer. package: The name of the
				package global: Installs the package for all users. force:
				Installs the package without any prompts. bpm upgrade
				&ltpackage&gt [version] [-global] Installs a new version of the
				package. package: The name of the package version: The new
				version to install. (Not supported yet) global: Installs the
				package for all users. bpm add &ltpackage&gt [path] [-global]
				[-copy] Adds the package to a workspace. Note: The package will
				be locked in that workspace to prevent unintentional changes.
				You can use -copy the make a unlocked copy of the package just
				within that workspace, or unlock it inside the IDE to edit the
				installed package. Using -copy will copy the package to
				&ltProjectName&gt/packages/&ltPackageName&gt package: The name
				of the package path: The path to the workspace. This defaults to
				the current directory. global: Installs the global package.
				copy: Makes a copy of the package within that workspace.
			</p>
		</div>
	)
}
