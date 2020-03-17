function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function sumArray(array) {
    let sum = 0;
    for (let item of array) {
        sum += item;
    }
    return sum;
}

function getOneValueArray(value, len) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}

function min(a, b) {
    if (a < b) {
        return a;
    }
    return b;
}

function shuffleArray(arr) {
    let currentIndex = arr.length;
    while (0 !== currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        const temp = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temp;
    }

    return arr;
}

/**
 * @param totalPoints - to hand out to cells
 * @param numOfCells - that gets each part of the split
 * @param minValue per cell
 * @param maxValue per cell
 * @return array of points division of len - numOfCells
 */
function splitPointsRandomly(totalPoints, numOfCells, minValue, maxValue) {
    const pointsDivision = getOneValueArray(minValue, numOfCells);
    let pointsLeft = totalPoints - minValue * numOfCells;
    while (pointsLeft > 0) {
        for (let i = 0; i < numOfCells; i++) {
            const maxBoundary = min(maxValue - pointsDivision[i], pointsLeft);
            const pointsToAdd = getRandomInt(0, maxBoundary);
            pointsDivision[i] += pointsToAdd;
            pointsLeft -= pointsToAdd;
        }
    }
    return shuffleArray(pointsDivision);
}

export {getRandomInt, sumArray, getOneValueArray, splitPointsRandomly};