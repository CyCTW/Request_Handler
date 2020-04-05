const app = require('../server')
const request = require('supertest')

const exp_time = 1000;

describe('Get Endpoints Test', () => {
	
	it('should connect normally', async () => {
		const res = await request(app).get('/api/');
		// console.log(res.headers);
		expect(res.statusCode).toEqual(200);
	})
	
	it('should decrease visit count once', async () => {
		const res = await request(app).get('/api/');
		// console.log(res.headers);
		const exp = (exp_time-1).toString();

		expect(res.headers['x-ratelimit-remaining']).toEqual(exp);
		
	})

	it('should return 429 if connect too many time', async () => {
		var i;
		for(i=0; i<exp_time; i++) {
			await request(app).get('/api/');
		}
		const res = await request(app).get('/api/');
		expect(res.statusCode).toEqual(429);
		
	})
	
	
})
