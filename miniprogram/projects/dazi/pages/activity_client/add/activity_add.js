const AdminActivityBiz = require('../../../biz/admin_activity_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const behavior = require('../../admin/activity/add/admin_activity_add_bh.js');

Page({
	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'client',
		returnUrl: '../../my/index/my_index',

	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		this.setData(AdminActivityBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},
	
	bindFormSubmit: async function () {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		await this._bindFormSubmit();
	}
	/*
	// 修改后的提交函数
	bindFormSubmit: async function () {
		// 1. 登录检查
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		// 2. 获取待检测内容（假设你的表单内容字段是 content）
		const content = this.data.formData.title; 

		// 3. 调用安全检测
		try {
			// 显示加载中提示
			wx.showLoading({ title: '内容检测中', mask: true });

			// 3.1 调用你的云函数/后端接口（替换为你的实际接口地址）
			const res = await wx.cloud.callFunction({
				name: 'msgSecCheck',
				data: { content }
			});

			// 3.2 处理检测结果
			if (res.result.errcode === 87014) {
				wx.showToast({ title: '包含违规内容，请修改', icon: 'none' });
				return;
			} else if (res.result.errcode !== 0) {
				throw new Error('安全检测失败');
			}

			// 4. 安全检测通过，继续提交表单
			await this._bindFormSubmit();

		} catch (err) {
			console.error(err);
			wx.showToast({ title: '内容安全检测异常', icon: 'none' });
		} finally {
			wx.hideLoading();
		}
	}*/
})