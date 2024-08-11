<script setup>
import { index } from "../../configs/site.json";

const navs = index.navs;

const menus = [];

navs.map((nav) => {
    if (!nav.children) {
        menus.push({
            text: nav.text,
            href: nav.href,
        })
    } else {
        menus.push({
            text: nav.text,
            href: nav.href + nav.children[0].href
        });

        nav.children.map(child => {
            menus.push({
                text: child.text,
                href: nav.href + child.href,
                isSubmenu: true
            });
        })
    }
})

const handleBtnClick = function () {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.classList.toggle("menu__open");
    }
}
</script>

<template>
    <div class="hamburger-menu">
        <button id="menu-open-btn" @click="handleBtnClick">
            <div class="hamburger-menu__line"></div>
            <div class="hamburger-menu__line"></div>
            <div class="hamburger-menu__line"></div>
        </button>

        <div id="menu" class="menu">
            <button id="menu-close-btn" aria-label="Close menu" @click="handleBtnClick">
                X
            </button>
            <ul class="menu-list">
                <li class="menu-item" v-for="(item) in menus">
                    <a :href="item.href" :key="item.href" :class="{'submenu' : item.isSubmenu}">{{ item.text }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .hamburger-menu {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: fit-content;
    }

    #menu-open-btn {
        background-color: white;
        border: none;
        border-radius: 4px;
        width: 35px;
    }

    .hamburger-menu__line {
        width: 100%;
        height: 1px;
        background-color: black;
        margin: 5px 0;
    }

    .menu {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #7ca4a1;
        display: flex;
        width: 0;
        height: 100vh;
        flex-direction: column;
        align-items: flex-end;
        opacity: 0;
        transition: all 1s ease-in-out;
        visibility: hidden;
        z-index: 300;
    }

    .menu__open {
        width: 40vw;
        opacity: 1;
        visibility: visible;
    }

    #menu-close-btn {
        margin: 20px;
        border: 1px solid white;
        border-radius: 4px;
        padding: 5px 10px;
        background-color: transparent;
        font-size: 1.2rem;
    }

    .menu-list{
        width: 100%;
        color: white;
        padding-left: 0;
        text-align: center;
    }

    .menu-item{
        list-style: none;
        margin: 20px 0;

        & a{
            color: inherit;
        }
        
    }

    .submenu{
        margin-left: 20px;
    }

    a{
        text-wrap: nowrap;
    }
</style>
