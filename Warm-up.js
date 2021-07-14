describe ('Summing Function', () => {
    it('Contains NaN', () => {
        expect(() => sum([2,4,'six'])).toThrow();
    });

    it('Returns Zero Sum for Empty', () => {
        expect(() => sum([])).toEqual(0);
    });

    it('Calculates Sum'), () => {
        expect(() => sum([1,2,3])).toEqual(6);
    }
});