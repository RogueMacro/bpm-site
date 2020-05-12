export default (agent: string) =>
	agent.indexOf('MSIE ') > -1 || agent.indexOf('Trident/') > -1
