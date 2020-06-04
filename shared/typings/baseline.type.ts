interface _JSONObject {
	[key: string]: JSONObject;
}
type JSONObject = _JSONObject | number | string | null | boolean | JSONObject[];

interface Baseline {
	[key: string]: any;
}
export default Baseline