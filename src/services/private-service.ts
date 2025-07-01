import { AxiosResponse } from 'axios';
import { fetcher } from '../utils/fetcher';

class PrivateService {
  queryKeys = {
    createPrivateContest: 'createPrivateContest',
    joinPrivateContest: 'joinPrivateContest',
    getPrivateContestDetailById: 'getPrivateContestDetailById',
    joinBidPrivate: 'joinBidPrivate',
    getSettings: 'getSettings',
    rankDistribution: 'rankDistribution',
    yourBidding: 'yourBidding',
    bidderList: 'bidderList',

  };

  getSettings = async () => {
    return fetcher({
      url: `/privatecontest/setting_to_app`,
      method: 'GET',
    });
  }

  createPrivateContest = async (data: any) => {
    return fetcher({
      url: `/privatecontest/create`,
      method: 'POST',
      data
    });
  }

  joinPrivateContest = async (data: { contestId: string }) => {
    return fetcher({
      url: `/privatecontest/join-influencer/contest/${data?.contestId}`,
      method: 'POST',
    });
  }

  getPrivateContestDetailById = async (data: { contestId: string }) => {

    return fetcher({
      url: `/privatecontest/single/${data?.contestId}`,
      method: 'GET',
    });
  }

  joinBidPrivate = async (data: { contestId: string, payload: { bidAmount: number } }) => {
    const { contestId, payload } = data
    console.log("payload", payload);

    return fetcher({
      // url: `/privatecontest/bidding/${contestId}`,
      url: `/privatecontest/bidding/${contestId}`,
      method: 'POST',
      data: payload
    });
  }

  rankDistribution = async (data: any) => {
    return fetcher({
      url: `/privatecontest/rankDistribution`,
      method: 'POST',
      data
    });
  }

  yourBidding = async (contestId: string) => {
    return fetcher({
      url: `/privatecontest/biddingList/${contestId}`,
      method: 'GET',
    });
  }

  bidderList = async (contestId: string) => {
    return fetcher({
      url: `/privatecontest/bidderList/${contestId}`,
      method: 'GET',
    });
  }

}

export default new PrivateService();