import { type CollectionEntry } from "astro:content";

export interface Social {

}

// 导航链接
export interface SubNav {
    text: string,
    href: string,
}
export interface Nav {
    text: string,
    href: string,
    children?: SubNav[]
}

// 归档项
export interface Archive {
    year: number,
    count: number,
    posts: Post[]
}

// 分类项
export interface Category {
    text: string;
    href: string;
}

// 标签项
export interface Tag {
    text: string;
    href: string;
}

// 推文
export type Post = CollectionEntry<'posts'>;

// 排序方式
export type Seq = 'asc' | 'desc'