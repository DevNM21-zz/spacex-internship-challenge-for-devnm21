import axios from 'axios';

class SpacexAPI {
	api;
	constructor() {
		this.api = axios.create({
			baseURL: 'https://api.spacexdata.com/v3/launches',
		});
	}
	
	// filter could be one of the values: 'upcoming', 'past', if null all launches is fetched
	getLaunches (filter, page) {
		filter =  filter ? '/' + filter : '';
		const offset = page ? page * 10 : 0;
		
		return this.api.get(filter, {
			params: {
				offset,
				limit: 10,
			}
		});
	}
}

export default new SpacexAPI();
