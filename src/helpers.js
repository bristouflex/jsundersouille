import * as data from "./assets/exercises"

const getExercise = (number) => {
    let exercises = data.default.exercises;
    return exercises[number-1];
}

const getTotal = () => {
    return data.default.total;
}


export { getExercise, getTotal }