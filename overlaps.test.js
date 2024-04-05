const overlaps = require('./overlaps.js');

test('tests ranges that should be true', () => {
    expect(overlaps(1, 5, 4, 10)).toBeTruthy();
    expect(overlaps(1, 4, 4, 10)).toBeTruthy();
    expect(overlaps(0, 0, 0, 0)).toBeTruthy();
    expect(overlaps(-500, -10, -500, -499)).toBeTruthy();
    expect(overlaps(-20000, 20001, -20001, 500000)).toBeTruthy();
})

test('testing if error is thrown when min greater than max', () => {
    expect(() => overlaps(1, 5, 10, 4)).toThrow(Error);
    expect(() => overlaps(10, 5, 1, 4)).toThrow(Error);
    expect(() => overlaps(0,-5, 100, 400)).toThrow(Error);
    expect(() => overlaps(1, 5, -10, -40)).toThrow(Error);
    expect(() => overlaps(1, -5, 10, -800)).toThrow(Error);
})

test('tests ranges that should be false', () => {
    expect(overlaps(1, 3, 4, 10)).toBeFalsy();
    expect(overlaps(0, 30, 400, 1000)).toBeFalsy();
    expect(overlaps(-200, -30, -25, 30)).toBeFalsy();
    expect(overlaps(0, 0, 1, 1)).toBeFalsy();
    expect(overlaps(-1000, 3, 200, 1000)).toBeFalsy();
})

