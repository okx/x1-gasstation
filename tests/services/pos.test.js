import v1Recommendation from '../../src/models/v1recommendation.js';
import v2Recommendation from '../../src/models/v2recommendation.js';
import posV2FetchPrices, { getV1Recommendation, getV2Recommendation } from '../../src/services/pos.js';
import mockedHistoryData from '../mockData/mockFeeHistory.js';
import Logger from '../../src/helpers/logger.js';


jest.mock('../../src/utils/sleep.js');
jest.mock('web3');
jest.mock('../../src/models/v2recommendation.js');
jest.mock('../../src/models/v1recommendation.js');
jest.mock('../../src/helpers/logger.js');


describe('PoS service', () => {

    let mockedWeb3,
        v2Mock,
        v1Mock;

    beforeEach(() => {
        v2Mock = new v2Recommendation();
        v1Mock = new v1Recommendation();

        v1Mock.blockNumber = 0;
        v1Mock.timestamp = 0;

        mockedWeb3 = {
            eth: {
                getBlock: jest.fn().mockResolvedValueOnce({
                    number: 44951950n,
                    timestamp:1689083720950
                }),

                getFeeHistory: jest.fn().mockResolvedValueOnce(mockedHistoryData)
            }
        }

        v2Mock.servable.mockReturnValueOnce({
            safeLow: { maxPriorityFee: 30, maxFee: 130.910560974 },
            standard: { maxPriorityFee: 30, maxFee: 130.910560974 },
            fast: { maxPriorityFee: 30, maxFee: 130.910560974 },
            estimatedBaseFee: 100.910560974,
            blockTime: 1689083720950,
            blockNumber: 44952697
        })   
    });

    it('should fetch price and save recommendation', async () => {
        await posV2FetchPrices(
            v1Mock,
            v2Mock,
            mockedWeb3
        );

        expect(v2Mock.updateGasPrices).toBeCalledWith(
            30, 30, 34.44355880126667, 111.023313111, 44951950, 1689083720950, 1689083720950
        );

        expect(v1Mock.updateGasPrices).toBeCalledWith(
            130.910560974, 130.910560974, 130.910560974, 44951950, 1689083720950, 1689083720950
        );
    });

    it('Should handle error if any', async() => {
        v2Mock.updateGasPrices.mockImplementation(() => 
            { throw new Error('mock_error') }
        );


        await posV2FetchPrices(
            v1Mock,
            v2Mock,
            mockedWeb3
        );
        expect(Logger.error).toBeCalledTimes(1);
    });

    it('Get v1 recommendation', async() => {
        v1Mock.servable.mockReturnValueOnce('test')
        await posV2FetchPrices(
            v1Mock,
            v2Mock,
            mockedWeb3
        );

        expect(getV1Recommendation()).toEqual('test');
    });

    it('Get v2 recommendation', async() => {
        v2Mock.servable.mockReturnValueOnce('test')
        await posV2FetchPrices(
            v1Mock,
            v2Mock,
            mockedWeb3
        );

        expect(getV2Recommendation()).toEqual('test');
    })
});
