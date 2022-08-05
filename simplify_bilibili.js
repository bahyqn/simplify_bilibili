// ==UserScript==
// @name         简化b站
// @namespace    http://tampermonkey.net/
// @version      0.1
// @license      GPL
// @description  去除了b站的导航栏（根据chrome来制作的，其他的浏览器兼容性可能不好，脚本做的不太好）
// @author       You
// @match        *://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
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

            try {
                let right_div = document.getElementsByClassName('user-con signin').item(0);
                console.log(right_div);
                let child = right_div.querySelectorAll('.item');
                console.log(child)
                for (let i = 1; i < 5; i++) {
                    child[i].remove();
                }
            } catch (e) {
                console.log('not delete');
            }
        }

        window.onload = function () {
            let url_list = window.location.href.split('bilibili.com');
            console.log(url_list);

            if (url_list[1].length <= 3) {
                remove_index();
            } else {
                if (url_list[1].indexOf('video') == 1) {
                    remove_video();
                } else {
                    remove_other();
                }
            }
        }
    }

)
();