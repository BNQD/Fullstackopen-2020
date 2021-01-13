import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	
	const weight = req.query.weight;
	const height = req.query.height;
	
	let output = {};
	
	if (weight === undefined || height === undefined){
		output = {
			error: "missing inputs"
		};
	}
	else {
		const result = calculateBmi(+weight, +height);
		output = {
			weight,
			height,
			result
		};
	}
	

	res.send(output);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
