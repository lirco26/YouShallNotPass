import _ from 'lodash';

function getOneValueArray(length, value) {
    return new Array(length).fill(value);
}

/**
 * @param totalAmount - to hand out to cells
 * @param numOfCells - that gets each part of the split
 * @param minValue per cell
 * @param maxValue per cell
 * @return array of the total amount divided to (numOfCells) cells
 */
function splitAmountRandomly(totalAmount, numOfCells, minValue, maxValue) {
    const amountDivision = getOneValueArray(minValue, numOfCells);
    let amountLeft = totalAmount - minValue * numOfCells;
    while (amountLeft > 0) {
        for (let i = 0; i < numOfCells; i++) {
            const maxBoundary = Math.min(maxValue - amountDivision[i], amountLeft);
            const amountToAdd = _.random(0, maxBoundary);
            amountDivision[i] += amountToAdd;
            amountLeft -= amountToAdd;
        }
    }
    return _.shuffle(amountDivision);
}

export {getOneValueArray, splitAmountRandomly};