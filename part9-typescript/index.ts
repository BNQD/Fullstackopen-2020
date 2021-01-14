import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (req, res) => {
	const hours = req.body.daily_exercises
	const target = req.body.target
	
	let output = {}
	
	if (hours === undefined || target === undefined){
		output = {
			error: "missing parameters"
		};
	} else {
		if (!Array.isArray(hours) || typeof(target) !== "number"){
			output = {
				error: "malformatted parameters"
			}
		} else {
			output = (calculateExercises(hours, target))
		}
	}
	
	res.send(output)
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
