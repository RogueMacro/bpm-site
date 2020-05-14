export default function sort<T>(list: T[], order: (origin: T) => number): T[] {
	if (list.length === 1) return list

	const [pivot, ...tail] = list

	if (pivot === undefined) return []
	if (tail.length === 0) return [pivot]

	return sort(
		tail.filter((x) => order(x) < order(pivot)) || [],
		order
	).concat(
		[pivot],
		sort(tail.filter((x) => order(x) > order(pivot)) || [], order)
	)
}
