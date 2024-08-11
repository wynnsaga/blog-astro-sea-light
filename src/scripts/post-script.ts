import { getCollection } from "astro:content";
import type { Post, Archive, Seq } from "../types";
import _ from "lodash";

// 所有
function fetchAll(): Promise<Post[]> {
    return getCollection("posts");
}

// 草稿
function fetchDrafts(): Promise<Post[]> {
    return getCollection('posts', ({ data }: any) => {
        return data.draft;
    });
}

// 出版物
function fetchPublications(): Promise<Post[]> {
    return getCollection('posts', ({ data }: any) => {
        return !data.draft;
    });;
}

// 置顶
function fetchPinned(): Promise<Post[]> {
    return getCollection('posts', ({ data }: any) => {
        return data.pin;
    });;
}

// 非置顶
function fetchUnpinned(): Promise<Post[]> {
    return getCollection('posts', ({ data }: any) => {
        return !data.pin;
    });;
}

// 按发布时间排序
function sortByDate(posts: Post[], seq: Seq = 'desc'): Post[] {
    if (posts.length === 0) {
        return [];
    }
    const r = posts.sort((p1, p2) => {
        const d1 = p1.data.date.publish;
        const d2 = p2.data.date.publish;
        return d1.getTime() - d2.getTime();
    })
    if (seq === 'asc') {
        return r;
    }
    return r.reverse();
}

// 获取年份
function obtainYears(posts: Post[], order: Seq = 'desc'): number[] {
    const everyYears = posts.map((p) => {
        return p.data.date.publish.getFullYear();
    });

    if (order === 'asc') {
        return [...new Set(everyYears)].sort();
    }
    return [...new Set(everyYears)].sort().reverse();
}

// 获取归档
function fetchArchives(posts: Post[]) {
    const r: Archive[] = [];
    const years = obtainYears(posts);

    years.forEach((year) => {
        const screenedPosts = posts.filter((p) => {
            return p.data.date.publish.getFullYear() === year;
        });

        r.push({
            year: year,
            count: screenedPosts.length,
            posts: sortByDate(screenedPosts)
        });
    });

    return r;
}

// 按是否置顶分类并在子集中按时间降序
function classifyPinAndDescByDate(posts: Post[]): Post[] {
    if (posts.length === 0) {
        return [];
    }
    return _.orderBy(posts, ['data.pin', 'data.date.publish'], ['desc', 'desc']);
}

// 获取归档
function obtainArchives(posts: Post[]) {
    const array: Archive[] = [];
    const years = obtainYears(posts);

    years.forEach((year) => {
        const screenedPosts = posts.filter((p) => {
            return p.data.date.publish.getFullYear() === year;
        });

        array.push({
            year: year,
            count: screenedPosts.length,
            posts: sortByDate(screenedPosts)
        })

    });

    return array;
}

export {
    fetchAll,
    fetchDrafts,
    fetchPublications,
    fetchPinned,
    fetchUnpinned,
    fetchArchives,

    sortByDate,
    obtainYears,
    obtainArchives,
    classifyPinAndDescByDate,
};