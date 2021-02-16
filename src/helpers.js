import * as data from "./assets/exercises"

const getExercise = (number) => {
    let exercises = data.default.exercises;
    return exercises[number-1];
}

const getTotal = () => {
    return data.default.exercises.length;
}


export { getExercise, getTotal }