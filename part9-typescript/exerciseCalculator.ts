const calculateExercises = (hours: number[], target: number) => {
	const sum = hours.reduce((a, b) => a + b, 0);
	const average = (sum/hours.length);
	
	const rating_calc = (average: number, target: number) => {
		const rounded_average = Math.round(average);
		if (rounded_average < target) {
			return 1;
		} else if (rounded_average === target) {
			return 2;
		} else {
			return 3;
		}
	};
	
	const rating_dict = {
		1: 'target not met',
		2: 'target met',
		3: 'target exceeded'
	};
	
	
	const training_details = {
		periodLength: hours.length,
		trainingDays: hours.filter(x => x != 0).length,
		success: average>=target,
		rating: rating_calc(average, target),
		ratingDescription: rating_dict[rating_calc(average, target)],
		target,
		average: average
	};
	
	return (training_details);
};

const input = process.argv;
const hours = input.slice(2, input.length).map(x=>+x);
console.log(hours);

console.log(calculateExercises(hours.slice(0, hours.length - 1), hours[hours.length-1]));

export { calculateExercises }