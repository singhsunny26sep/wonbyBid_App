export interface GET_ALL_CATEGORY_HOME {
  page: number;
  totalPages: number;
  totalCategory: number;
  data: {
    success: boolean;
    data: {
      _id: string;
      title: string;
      duration: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      status: string;
    }[];
  };
};

export interface GET_HOME_CONTEST_BY_CATEGORY {
  success: boolean;
  data: {
    _id: string;
    name: string;
    auctioncategory: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    contests: {
      _id: string;
      entryAmount: number;
      slots: number;
      uptoBid?: number;
      type: string;
      subcategoryId: string;
      platformFeePercentage: number;
      winningsPercentage?: number;
      bonusCashPercentage: number;
      bonusCashPerEntryAmount?: number;
      images?: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      prizePool?: number;
      rankDistribution: {
        rank: (number | string);
        percentage: number;
        amount: number;
      }[];
      bonusCashAmount: number;
      platformFeeAmount: number;
      prizeDistributionAmount: number;
      prizeDistributionPercentage: number;
      rankCount: number;
      rankPercentage: number;
      totalAmount: number;
      typeCashBonus: string;
      upto: number;
      timeSlots: {
        startTime: string;
        endTime: string;
        status: string;
        _id: string;
      }[];
      subcategoryIdString: string;
    }[];
  }[];
  page: number;
  totalPages: number;
  totalfilteredSubcategories: number;
}