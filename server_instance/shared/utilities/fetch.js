// Async function for handling front-end get, post and patch calls
export default {
	async execute(path, options) {
		const route = `${path}`;
		// Set default headers
		options.headers = Object.assign(
			{
				Accept: "application/json",
				"Content-Type": "application/json",
				Pragma: "no-cache"
			},
			options.headers || {}
		);

		// Perform fetch on the endpoint
		const response = await fetch(route, options);

		// Valid response if status 200 ~ 299
		let json = response.json();
		if (response.status >= 200 && response.status < 300) {
			return json;
		}

		// Throw error if any other response from server
		return json.then(error => {
			throw error;
		});
	},

	perform(path, options = {}) {
		return this.execute(path, options);
	}
};