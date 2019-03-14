import _promise from 'es6-promise';
_promise.polyfill();
import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '../lossweight/coach/';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 60000;
// 添加请求拦截器
axios.interceptors.request.use((config)=>{
	return config;
}, (error)=>{
	return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use((response)=>{
	// 对响应数据做点什么
	let res = response.data,
		status = response.status;
	if(res.sUserStatus&&res.sUserStatus.login=='N'){
		location.href = '/login';
	}
	if(status===200||status===304){
		return res;
	}else{
		location.href = '/login';
	}
}, (error)=>{
	// 对响应错误做点什么
	let status = error.response.status.toString();
	if(status.startsWith("5")){
		location.href = '/login';
		return;
	}
	return Promise.reject(error);
});

export const loginService = (data)=>{ return axios.post('login', data) };

export const logoutService = ()=>{ return axios.post('logout') };

export const getClassInfoService = (data)=>{ return axios.get('class',data) };//获取班级列表

export const queryClassInfoService = (data)=>{ return axios.get('class',data) };//根据班级名称查询班级

export const getClassKaListService = (data)=>{ return axios.get('forum/'+data.classId,data) };//获取班级打卡列表

export const getMemberKaListService = (data)=>{ return axios.get('forum/'+data.classId+'/'+data.userId,data) };//获取班级个人打卡列表
/******************/
export const deleteMemberKaService = (data)=>{ return axios.delete('forum/'+data.forumId) };//删除个人打卡

export const getClassKaDetailService = (data)=>{ return axios.get('sprotmethod/'+data.classId+'/'+data.userId,data) };//获取班级成员的打卡详情

export const getClassMemberRemarkService = (data)=>{ return axios.get('remark/'+data.classId+'/'+data.userId) };//获取班级成员的备注详情

export const getStarScoreCommsService = (data)=>{ return axios.get('starscorecomms/'+data.forumType+'/'+data.starNum) };//获取星级评语列表

export const forumactionService = (data)=>{ return axios.post('forumaction/'+data.forumId,data) };//提交打卡评价

export const getClassUsersService = (data)=>{ return axios.get('classusers/'+data.classId,data) };//获取班级成员列表

export const updataDietStatusService = (data)=>{ return axios.put('dietstatus/'+data.classId+'/'+data.userId,data) };//修改班级成员个人暴食状态

export const getMemberRemarkListService = (data)=>{ return axios.get('remark/'+data.classId+'/'+data.userId) };//获取班级成员备注列表

export const getEmptyWeightService = (data)=>{ return axios.get('weightlist/'+data.classId+'/'+data.userId,data) };//获取班级成员的备注详情

export const updateEmptyWeightService = (data)=>{ return axios.put('weight/'+data.reportId, data) };//修改空腹体重信息

export const getMemberPlanListService = (data)=>{ return axios.get('plan/'+data.classId+'/'+data.userId,data) };//获取班级成员计划列表

export const getMemberMethodService = (data)=>{ return axios.get('method/'+data.classId+'/'+data.userId) };//获取班级成员饮食计划

export const getMethodService = (data)=>{ return axios.get('method',data) };//获取所有饮食计划

export const updataMethodService = (data)=>{ return axios.put('method/'+data.classId+'/'+data.userId,data) };//修改饮食计划

export const getDayPlanListService = (data)=>{ return axios.get('dayplan/'+data.id,data) };//获取日计划详情列表

export const toRestService = (data)=>{ return axios.post('dayplan',data) };//修改计划为休息

export const getAerobicsesListService = (data)=>{ return axios.get('aerobicses',data) };//获取有氧操列表

export const updataAerobicsesService = (data)=>{ return axios.put('day/aerobicses/'+data.id,data) };//替换有氧操列表

export const addAerobicsesService = (data)=>{ return axios.post('day/aerobicses',data) };//添加有氧操列表

export const deleteAerobicsesService = (data)=>{ return axios.delete('day/aerobicses/'+data.id) };//删除有氧操列表

export const getDayMotionListService = (data)=>{ return axios.get('daymotion/'+data.id,data) };//查看室内运动组合列表

export const getSinglePlanListService = (data)=>{ return axios.get('singleplan',data) };//获取室内运动列表

export const addIndoorService = (data)=>{ return axios.post('indoor',qs.stringify(data)) };//添加室内单次计划

export const deleteIndoorService = (data)=>{ return axios.delete('indoor/'+data.id) };//删除室内单次计划

export const addOutdoorService = (data)=>{ return axios.post('outdoor',qs.stringify(data)) };//添加室外运动计划

export const updateOutdoorService = (data)=>{ return axios.put('outdoor/'+data.id,qs.stringify(data)) };//修改室外运动计划时间

export const deleteOutdoorService = (data)=>{ return axios.delete('outdoor/'+data.id) };//删除室外计划