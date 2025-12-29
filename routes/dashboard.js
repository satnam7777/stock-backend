const express = require('express');
const router = express.Router();

// -------------------- Fake Data -------------------- //

const stats = [
  { label: 'Avg. Client Rating', value: '7.8/10', trend: '+2.5%', trendColor: 'text-green-500', icon: 'BarChart3', description: 'than last Week' },
  { label: 'Instagram Followers', value: '522K', trend: '-1.5%', trendColor: 'text-red-500', icon: 'Users', description: 'than last Week' },
  { label: 'Google Ads CPC', value: '5.03', trend: '+2.6%', trendColor: 'text-green-500', icon: 'DollarSign', description: 'than last Week' },
];

const campaignLine = [
  { name: 'Jan', FacebookAds: 40, GoogleAds: 60 },
  { name: 'Feb', FacebookAds: 80, GoogleAds: 90 },
  { name: 'Mar', FacebookAds: 50, GoogleAds: 140 },
  { name: 'Apr', FacebookAds: 120, GoogleAds: 100 },
  { name: 'May', FacebookAds: 240, GoogleAds: 200 },
  { name: 'Jun', FacebookAds: 190, GoogleAds: 240 },
  { name: 'Jul', FacebookAds: 130, GoogleAds: 240 },
  { name: 'Aug', FacebookAds: 90, GoogleAds: 230 },
  { name: 'Sep', FacebookAds: 20, GoogleAds: 70 },
  { name: 'Oct', FacebookAds: 60, GoogleAds: 100 },
  { name: 'Nov', FacebookAds: 130, GoogleAds: 80 },
  { name: 'Dec', FacebookAds: 110, GoogleAds: 120 },
];

const campaignBar = [
  { name: 'S', FacebookAds: 160 },
  { name: 'S', FacebookAds: 380 },
  { name: 'M', FacebookAds: 200 },
  { name: 'T', FacebookAds: 300 },
  { name: 'W', FacebookAds: 180 },
  { name: 'T', FacebookAds: 190 },
  { name: 'F', FacebookAds: 290 },
];

const topChannels = [
  { source: 'Google', icon: '/icons/google.png', FacebookAds: '3.5K', revenue: '$4,220', sales: '3456', conversion: '2.59%' },
  { source: 'X.com', icon: '/icons/x.png', FacebookAds: '3.5K', revenue: '$4,220', sales: '3456', conversion: '2.59%' },
  { source: 'Github', icon: '/icons/github.png', FacebookAds: '3.5K', revenue: '$4,220', sales: '3456', conversion: '2.59%' },
  { source: 'Vimeo', icon: '/icons/vimeo.png', FacebookAds: '3.5K', revenue: '$4,220', sales: '3456', conversion: '2.59%' },
  { source: 'Facebook', icon: '/icons/facebook.png', FacebookAds: '3.5K', revenue: '$4,220', sales: '3456', conversion: '2.59%' },
];

const featuredCampaigns = [
  { title: 'Best Headsets Giveaway', status: 'In Queue', color: 'bg-yellow-100 text-yellow-600', conversion: '0%(0)' },
  { title: 'iPhone 14 Plus Giveaway', status: 'Sent', color: 'bg-green-100 text-green-600', conversion: '37%(247)' },
  { title: 'Macbook Pro M1 Giveaway', status: 'Sent', color: 'bg-green-100 text-green-600', conversion: '18%(6.4k)' },
  { title: 'Affiliation Program', status: 'Sent', color: 'bg-green-100 text-green-600', conversion: '12%(2.6k)' },
  { title: 'Google AdSense', status: 'In Draft', color: 'bg-indigo-100 text-indigo-600', conversion: '0.01%(1)' },
];

const externalLinks = [
  { name: 'Google Analytics', icon: '/icons/google-analytics.png' },
  { name: 'FacebookAds', icon: '/icons/facebook.png' },
  { name: 'Seranking', icon: '/icons/seranking.png' },
  { name: 'Instagram Ads', icon: '/icons/instagram.png' },
];

// -------------------- API Endpoint -------------------- //

router.get('/', (req, res) => {
  res.json({
    stats,
    campaignLine,
    campaignBar,
    topChannels,
    featuredCampaigns,
    externalLinks,
  });
});

module.exports = router;
