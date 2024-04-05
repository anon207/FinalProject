function overlaps(min1, max1, min2, max2) {
    ans = false;
    if((min1 <= max2 && min1 >= min2) || (min2 <= max1 && min2 >= min1)) {
        ans = true;
    }
    if((min1 > max1) || (min2 > max2)) {
        throw new Error('min cannot be greater than max.');
    }
    return(ans);
}

module.exports = overlaps;