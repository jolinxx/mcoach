import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'//登录
import ClassList from '@/pages/class/Lists'//班级列表（首页）
import ClassEvaluate from '@/pages/ClassEvaluate'//去评卡
import MemberList from '@/pages/member/List'//班级成员列表
import MemberRemark from '@/pages/Remark'//成员备注
import MemberKaList from '@/pages/Ka'//成员打卡列表
import KaDetail from '@/pages/Ka/KaDetail'//成员打卡列表
import AdjustPlan from '@/pages/AdjustPlan'//调整计划
import Aerobics from '@/pages/AdjustPlan/Aerobics'//替换/添加有氧操
import OnceSport from '@/pages/AdjustPlan/OnceSport'//单独计划
import ViewAction from '@/pages/AdjustPlan/OnceSport/ViewAction.vue'//查看动作
import OutdoorSport from '@/pages/AdjustPlan/OutdoorSport'//室外运动
import ChangeTime from '@/pages/AdjustPlan/OutdoorSport/ChangeTime'//室外运动
import MemberDiet from '@/pages/Diet'//用户饮食计划
import Loading from '@/components/Loading/Loading.vue'//室外运动
 

Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [{
			path: '*',
			name: 'login',
			component: Login
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/class_list',
			name: 'class_list',
			component: ClassList
		},
		{
			path: '/class-evaluate',
			name: 'class_evaluate',
			component: ClassEvaluate
		},
		{
			path: '/member-list',
			name: 'member_list',
			component: MemberList
		},
		{
			path: '/member-remark',
			name: 'member_remark',
			component: MemberRemark
		},
		{
			path: '/ka-list',
			name: 'ka_list',
			component: MemberKaList
		},
		{
			path: '/ka-detail',
			name: 'ka_detail',
			component: KaDetail
		},
		{
			path: '/adjust-plan',
			name: 'adjust_plan',
			component: AdjustPlan
		},
		{
			path: '/aerobics',
			name: 'aerobics',
			component: Aerobics
		},
		{
			path: '/once-sport',
			name: 'once_sport',
			component: OnceSport
		},
		{
			path: '/view-action',
			name: 'view_action',
			component: ViewAction
		},
		{
			path: '/outdoor-sport',
			name: 'outdoor_sport',
			component: OutdoorSport
		},
		{
			path: '/change-time',
			name: 'change_time',
			component: ChangeTime
		},{
			path: '/member-diet',
			name: 'member_diet',
			component:MemberDiet
		},
		{
			path: '/loading',
			name: 'loading',
			component: Loading
		}
	]
})