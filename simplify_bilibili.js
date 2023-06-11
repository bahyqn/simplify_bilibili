// ==UserScript==
// @name         简化b站导航栏
// @namespace    http://tampermonkey.net/
// @version      0.12
// @license      GPL
// @description  去除了b站的导航栏（要先手动退出内测，等哪天老鸽子想写的时候重新构建下，加入选项来按需删除）
// @author       bahyqn
// @match        *://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @note         2022-08-07-V0.12 增加了搜索页的删除导航栏
// ==/UserScript==

(function () {
        'use strict';

        // Your code here...

        function remove_index() {

            let left_entry = document.getElementsByClassName('left-entry')[0].style.visibility = 'hidden';
            let right_entry = null;
            let time = setInterval(function () {
                right_entry = document.getElementsByClassName('bili-header__bar')[0].getElementsByClassName('right-entry')[0];
                if (right_entry != null) {
                    let lis = right_entry.querySelectorAll('.v-popover-wrap');
                    lis[1].style.display = 'none';
                    lis[2].style.display = 'none';
                    lis[3].style.display = 'none';
                    clearInterval(time)
                }
            }, 200);

            var bili_header__channel = document.getElementsByClassName('bili-header__channel');
            bili_header__channel[0].remove();

            var bili_layout = document.getElementsByClassName('bili-layout');
            bili_layout[0].style.marginTop = "2rem";

            var recommended_swipe = document.getElementsByClassName('recommended-swipe');
            recommended_swipe[0].remove();
        }

        function remove_video() {

            let right_entry = null;
            let time = setInterval(function () {
                right_entry = document.getElementsByClassName('bili-header__bar')[0].getElementsByClassName('right-entry')[0];
                if (right_entry != null) {
                    let left_entry = document.getElementsByClassName('left-entry')[0].style.visibility = 'hidden';
                    let lis = right_entry.querySelectorAll('.v-popover-wrap');
                    lis[1].style.display = 'none';
                    lis[2].style.display = 'none';
                    lis[3].style.display = 'none';
                    clearInterval(time)
                }
            }, 200);
        }

        function remove_other() {
            var li = document.getElementsByTagName('li');
            console.log('remove_other');
            console.log(li);
            for (let i = 0; i < 10; i++) {
                li[i].style.visibility = "hidden";
            }

            let right_div = null;
            let time = setInterval(function () {
                right_div = document.getElementsByClassName('user-con signin').item(0);
                if (right_div != null) {
                    let child = right_div.querySelectorAll('.item');
                    console.log(child)
                    for (let i = 1; i < 5; i++) {
                        child[i].remove();
                    }
                    clearInterval(time);
                }
            }, 200);
        }

        function remove_search() {
            // remove search
            let left_entry = document.getElementsByClassName('left-entry')[0].style.visibility = 'hidden';
            let right_entry = null;
            let time = setInterval(function () {
                right_entry = document.getElementsByClassName('bili-header__bar')[0].getElementsByClassName('right-entry')[0];
                if (right_entry != null) {
                    let lis = right_entry.querySelectorAll('.v-popover-wrap');
                    lis[1].style.display = 'none';
                    lis[2].style.display = 'none';
                    lis[3].style.display = 'none';
                    clearInterval(time)
                }
            }, 200);
        }

        window.onload = function () {
            let url_list = window.location.href.split('bilibili.com');
            console.log(url_list);

            if (url_list[1].length <= 3) {
                remove_index();
            } else if (url_list[1].indexOf('all') == 1){
                remove_search();
            } else if (url_list[1].indexOf('video') == 1) {
                remove_video()
            } else {
                remove_other()
            }
        }
    }

)();
