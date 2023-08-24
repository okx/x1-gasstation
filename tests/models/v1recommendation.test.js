import v1Recommendation from "../../src/models/v1recommendation.js";

describe('V1 Recommendation', () => {

    it('should update gas prices', () => {
        const v1Rec = new v1Recommendation();

        v1Rec.updateGasPrices(
           1, 2, 3, 4, 5, 6
        );

        expect(v1Rec.safeLow).toEqual(1);
        expect(v1Rec.standard).toEqual(2);
        expect(v1Rec.fast).toEqual(3);
        expect(v1Rec.blockNumber).toEqual(4);
        expect(v1Rec.blockTime).toEqual(5);
        expect(v1Rec.blockTimestamp).toEqual(6);
    });

    it('Should serve the correct values', () => {
        const v1Rec = new v1Recommendation();

        v1Rec.updateGasPrices(
            1, 2, 3, 4, 5, 6
        );

        expect(v1Rec.servable()).toEqual(
            { safeLow: 1, standard: 2, fast: 3, blockTime: 5, blockNumber: 4 }
        );
    })
});
