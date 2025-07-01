import { GET_ALL_CATEGORY_HOME, GET_HOME_CONTEST_BY_CATEGORY } from './../types/home/response-type';

import { AxiosResponse } from 'axios';
import { fetcher } from '../utils/fetcher';

class HomeService {
  queryKeys = {
    getAllCategory: 'getAllCategory',
    getAllContestByCategory: 'getAllContestByCategory',
    getCategories: 'getCategories',
    getSignleContestDetailHome: 'getSignleContestDetailHome',
    getCheckAlreadyJoin: 'getCheckAlreadyJoin',
    joinContestHome: 'joinContestHome',
    joinBidHome: 'joinBidHome',
    getUserBidsHome: 'getUserBidsHome',
    getBidersHome: 'getBidersHome',
    saveContestInMyMatches: 'saveContestInMyMatches',
    useUserDashboard: 'useUserDashboard',
    updateProfile: 'updateProfile',
    getOffer: 'getOffer',
    getNotification: 'getNotification',
  };

  getAllCategory = async (data: { pageParam: number }): Promise<AxiosResponse<GET_ALL_CATEGORY_HOME>> => {
    const { pageParam } = data

    return fetcher({
      url: `/category?page=${pageParam}`,
      method: 'GET',
    });
  }

  getAllContestByCategory = async (data: { catId: number, catType: string, pageParam: number }): Promise<AxiosResponse<GET_HOME_CONTEST_BY_CATEGORY>> => {
    const { catId, catType, pageParam } = data

    return fetcher({
      url: `/catcontest/${catId}/sub?status=${catType}&page=${pageParam}`,
      method: 'GET',
    });
  }

  getCategories = async (data: any) => {

    return fetcher({
      url: `/category/all`,
      method: 'GET',
    });
  }

  getSignleContestDetailHome = async (data: { contestId: string, timeslotId: string }) => {
    const { contestId, timeslotId } = data
    return fetcher({
      url: `/catcontest/get/single/contest/${contestId}/${timeslotId}`,
      method: 'GET',
    });
  }

  saveContestInMyMatches = async (data: { contestId: string, categoryId: string, timeslotId: string }) => {
    const { contestId, categoryId, timeslotId } = data
    return fetcher({
      url: `/catcontest/save/main/contest/${contestId}/${categoryId}/${timeslotId}`,
      method: 'PUT',
    });
  }
  
  activeNotificationAlert = async (data: { contestId: string, categoryId: string, timeslotId: string }) => {
    const { contestId, categoryId, timeslotId } = data
    return fetcher({
      url: `/notificationAlert/main/contest/${contestId}/${categoryId}/${timeslotId}`,
      method: 'PUT',
    });
  }

  getCheckAlreadyJoin = async (data: { contestId: string, timeslotId: string }) => {
    const { contestId, timeslotId } = data

    return fetcher({
      url: `/catcontest/check/user/already/join/${contestId}/${timeslotId}`,
      method: 'GET',
    });
  }

  joinContestHome = async (data: { contestId: string, timeslotId: string }) => {
    const { contestId, timeslotId } = data
    // console.log(data);

    return fetcher({
      url: `/catcontest/join/contest/${contestId}/${timeslotId}`,
      method: 'POST',
    });
  }


  joinBidHome = async (data: { contestId: string, timeslotId: string, payload: { bidAmount: number } }) => {
    // console.log("==================== joinBidHome =================");

    const { contestId, timeslotId, payload } = data
    // console.log("joinBidHome data: ", data);

    return fetcher({
      url: `/catcontest/contest/bid/${contestId}/${timeslotId}`,
      method: 'POST',
      data: payload
    });
  }

  getUserBidsHome = async (data: { contestId: string, timeslotId: string }) => {
    const { contestId, timeslotId } = data

    return fetcher({
      url: `/catcontest/contest/user/bids/${contestId}/${timeslotId}`,
      method: 'GET',
    });
  }

  getBidersHome = async (data: { contestId: string, timeslotId: string }) => {
    const { contestId, timeslotId } = data

    return fetcher({
      url: `/catcontest/contest/bidders/${contestId}/${timeslotId}`,
      method: 'GET',
    });
  }

  getNotification = async (data: { userId: string }) => {
    const { userId } = data
    console.log("=============================== getNotification =============================");

    console.log("userId: getNotification ", data);


    return fetcher({
      url: `/notify/notifications/${userId}`,
      // url: `/notify/notifications/67440b7c9da5ecf3e6518e08`,
      method: 'GET',
    });
  }

  useUserDashboard = async (data: { userId: string,categoryId:string }): Promise<AxiosResponse<GET_ALL_CATEGORY_HOME>> => {
    const { userId,categoryId } = data
    if (userId) {
      // console.log("============================ useUserDashboard ====================================");
      // console.log("userId: ", userId);
      return fetcher({
        url: `/user/dashbord/${userId}/${categoryId}`,
        method: 'GET',
      });
    } else {
      // console.log("============================ else ====================================");
      return fetcher({
        url: `/user/dashbord`,
        method: 'GET',
      });
    }
  }


  updateProfile = async (data: { payload: { name: string | any, profile: string | any } }) => {
    const { payload } = data
    // console.log(data);

    return fetcher({
      url: `/user/update`,
      method: 'PUT',
      data: payload
    });
  }

  getOffer = async () => {
    return fetcher({
      url: `/offerRecharge/all`,
      method: 'GET',
    });
  }





}

export default new HomeService();