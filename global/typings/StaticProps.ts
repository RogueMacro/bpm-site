export interface Project {
	title: string;
	author: string;
	downloads: {
		total: number;
		monthly: number;
		weekly: number;
		daily: number;
	};
	repo: string;
	readMe: string;
}
