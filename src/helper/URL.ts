export class URLHelper {
	static updateParameter(key: string, value: string): void {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set(key, value);
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.pushState({ path: newUrl }, "", newUrl);
	}

	static getParameter(key: string): string | null {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(key);
	}

	static removeParameter(key: string): void {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.delete(key);
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.pushState({ path: newUrl }, "", newUrl);
	}
}
