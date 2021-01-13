const calculateBmi = (weight: number, height: number) => {
	const bmi = (weight/(height/100*height/100))
	if (bmi > 25) {
		return 'overweight'
	} else if (bmi > 18.5) {
		return 'healthy weight'
	} else {
		return 'underweight'
	}
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
console.log(calculateBmi(a, b))

export { calculateBmi };