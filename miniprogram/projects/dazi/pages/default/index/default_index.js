const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js'); 
const ActivityBiz = require('../../../biz/activity_biz.js'); 
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    bannerList: [], // 改为空数组，从云端加载
    // 其他原有数据保持不变...
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		this.loadCloudBanners();
		this._getSearchMenu();
		this.setData({
			_params: {
				type: 'run', 
			},

			isLoad: true
		});
	},
	async loadCloudBanners() {
		
		  const res = await db.collection('banner')
			.doc('banner-config')
			.get()
			
		  this.setData({
			bannerList: res.data.images,
		  })
		 /*catch (err) {
		  console.error('Banner加载失败:', err)
		  // 失败时保持原有本地banner（可选）
		  this.setData({
			bannerList: [
			  '../../../images/banner.jpg',
			  '../../../images/banner1.jpg',
			  '../../../images/banner2.jpg'
			]
		  })
		  wx.showToast({ title: '推荐内容加载失败', icon: 'none' })
		}*/
	  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
	},

	onPullDownRefresh: async function () {
		wx.stopPullDownRefresh();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {

		let sortItem1 = [{
			label: '全部',
			type: 'cateId',
			value: ''
		}];

		if (ActivityBiz.getCateList().length > 1)
			sortItem1 = sortItem1.concat(ActivityBiz.getCateList());

		let sortItems = [];
		let sortMenus = [
			{ label: '全部', type: 'cateId', value: 'run' },
			{ label: '过往活动', type: 'his', value: 'his' },
		];
		this.setData({
			sortItems,
			sortMenus:sortItem1,
			isLoad: true,
		})

	}
})