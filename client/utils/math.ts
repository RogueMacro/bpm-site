export const logarithm = (x: number, base: number) =>
	Math.log(x) / Math.log(base)
export const round = (x: number, decimals: number) =>
	Math.round(x * 10 ** decimals) / 10 ** decimals
