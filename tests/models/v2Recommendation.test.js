import v2Recommendation from '../../src/models/v2recommendation.js';

describe('V1 Recommendation', () => {

    it('should update gas prices', () => {
        const v2Rec = new v2Recommendation();

        v2Rec.updateGasPrices(
           1, 2, 3, 0, 4, 5, 6
        );

        expect(v2Rec.safeLow).toEqual({ maxPriorityFee: 1, maxFee: 1 });
        expect(v2Rec.standard).toEqual({ maxPriorityFee: 2, maxFee: 2 });
        expect(v2Rec.fast).toEqual({ maxPriorityFee: 3, maxFee: 3 } );
        expect(v2Rec.blockNumber).toEqual(4);
        expect(v2Rec.blockTime).toEqual(5);
        expect(v2Rec.blockTimestamp).toEqual(6);
    });

    it('Should serve the correct values', () => {
        const v2Rec = new v2Recommendation();

        v2Rec.updateGasPrices(
            1, 2, 3, 0, 4, 5, 6
        );

        expect(v2Rec.servable()).toEqual(
            {
                safeLow: { maxPriorityFee: 1, maxFee: 1 },
                standard: { maxPriorityFee: 2, maxFee: 2 },
                fast: { maxPriorityFee: 3, maxFee: 3 },
                estimatedBaseFee: 0,
                blockTime: 5,
                blockNumber: 4
            }
        );
    })
})