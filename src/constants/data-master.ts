const categoryList: {
  categoryID: string;
  categoryImg: string;
  checked?: boolean;
}[] = [
  {
    categoryID: 'categoryID1#Web_Development',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/thiet-ke-website-3d-2.jpg',
  },
  {
    categoryID: 'categoryID2#Education',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/education.avif',
  },
  {
    categoryID: 'categoryID3#Business_Analiytics_&_Intelligence',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/images-ba.jpg',
  },
  {
    categoryID: 'categoryID4#Finance',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/images-finance.jpg',
  },
  {
    categoryID: 'categoryID5#Personal_Transformation',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/444dd013-bc6e-4f6d-b745-a36e8c6cf4aa.jpg',
  },
  {
    categoryID: 'categoryID6#Design',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/ai-generated-7915551_640.jpg',
  },
  {
    categoryID: 'categoryID7#Technical',
    categoryImg:
      // 'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/thiet-ke-website-3d-2.jpg',
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/technology-8025349_640.jpg',
  },
  {
    categoryID: 'categoryID8#Mobile_Development',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/ai-generated-8032928_640.jpg',
  },
  {
    categoryID: 'categoryID9#Creative',
    categoryImg:
      'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/ai-generated-8060982_640.jpg',
  },
];

const priceList: {
  priceMax: number;
  priceID: string;
  priceMin: number;
  checked?: boolean;
}[] = [
  { priceMax: 1000, priceID: 'price4', priceMin: 200 },
  { priceMax: 200, priceID: 'price3', priceMin: 100 },
  { priceMax: 100, priceID: 'price2', priceMin: 50 },
  { priceMax: 50, priceID: 'price1', priceMin: 0 },
];

const levelList: {
  levelID: string;
  levelType: string;
  checked?: boolean;
}[] = [
  { levelID: 'levelID#Intermediate', levelType: 'intermediate' },
  { levelID: 'levelID#Expert', levelType: 'expert' },
  { levelID: 'levelID#Beginner', levelType: 'beginner' },
  { levelID: 'levelID#All_Levels', levelType: 'all_level' },
];

export { categoryList, priceList, levelList };
