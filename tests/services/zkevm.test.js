import v1Recommendation from '../../src/models/v1recommendation.js';
import mockedHistoryData from '../mockData/mockFeeHistory.js';
import Logger from '../../src/helpers/logger.js';
import zkevmV1FetchPrices, { getZkevmRecommendation } from '../../src/services/zkevm.js';


jest.mock('../../src/utils/sleep.js');
jest.mock('web3');
jest.mock('../../src/models/v1recommendation.js');
jest.mock('../../src/helpers/logger.js');


describe('PoS service', () => {

    let mockedWeb3,
        v1Mock;

    beforeEach(() => {
        v1Mock = new v1Recommendation();

        v1Mock.blockNumber = 0;
        v1Mock.timestamp = 0;

        mockedWeb3 = {
            eth: {
                getBlock: jest.fn().mockResolvedValueOnce({
                    number: 44951950n,
                    timestamp:1689083720950
                }),

                getFeeHistory: jest.fn().mockResolvedValueOnce(mockedHistoryData),
                getGasPrice: jest.fn().mockResolvedValueOnce('100000')
            },
            utils: {
                fromWei: jest.fn().mockReturnValueOnce('1000000')
            }
        }
    });

    it('should fetch price and save recommendation', async () => {
        await zkevmV1FetchPrices(
            v1Mock,
            mockedWeb3
        );

        expect(v1Mock.updateGasPrices).toBeCalledWith(
            1000000, 1000000, 1000000, 44951950, 1689083720950, 1689083720950
        );
    });

    it('Should handle error if any', async() => {
        v1Mock.updateGasPrices.mockImplementation(() => 
            { throw new Error('mock_error') }
        );


        await zkevmV1FetchPrices(
            v1Mock,
            mockedWeb3
        );
        expect(Logger.error).toBeCalledTimes(1);
    });

    it('Get v1 recommendation', async() => {
        v1Mock.servable.mockReturnValueOnce('test')
        await zkevmV1FetchPrices(
            v1Mock,
            mockedWeb3
        );

        expect(getZkevmRecommendation()).toEqual('test');
    });
});