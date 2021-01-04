const calculateBmi = (weight: number, height: number) => {
	const bmi = (weight/(height*height))
	if (bmi > 25) {
		return 'overweight'
	} else if (bmi > 18.5) {
		return 'healthy weight'
	} else {
		return 'underweight'
	}
}
console.log(calculateBmi(74, 1.80))