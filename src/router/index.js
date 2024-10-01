"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.platform;
    if (/android/i.test(userAgent)) {
        return true;
    }
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return true;
    }
    return true;
};
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'loading',
            component: () => Promise.resolve().then(() => __importStar(require('../views/Loading.vue'))),
            beforeEnter: (to, from, next) => {
                if (!isMobileDevice()) {
                    next({ name: 'not-allowed' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/main',
            name: 'home',
            component: () => Promise.resolve().then(() => __importStar(require('../views/Main.vue'))),
            beforeEnter: (to, from, next) => {
                if (!isMobileDevice()) {
                    next({ name: 'not-allowed' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/bonuses',
            name: 'bonuses',
            component: () => Promise.resolve().then(() => __importStar(require('../views/Bonuses.vue'))),
            beforeEnter: (to, from, next) => {
                if (!isMobileDevice()) {
                    next({ name: 'not-allowed' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/friends',
            name: 'friends',
            component: () => Promise.resolve().then(() => __importStar(require('../views/Friends.vue'))),
            beforeEnter: (to, from, next) => {
                if (!isMobileDevice()) {
                    next({ name: 'not-allowed' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/roadmap',
            name: 'roadmap',
            component: () => Promise.resolve().then(() => __importStar(require('../views/RoadMap.vue'))),
            beforeEnter: (to, from, next) => {
                if (!isMobileDevice()) {
                    next({ name: 'not-allowed' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => Promise.resolve().then(() => __importStar(require('../views/Profile.vue'))),
            beforeEnter: (to, from, next) => {
                if (!isMobileDevice()) {
                    next({ name: 'not-allowed' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/notallowed',
            name: 'not-allowed',
            component: () => Promise.resolve().then(() => __importStar(require('../views/NotAllow.vue'))),
        }
    ]
});
exports.default = router;
