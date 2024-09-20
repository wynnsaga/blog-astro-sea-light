import { getCollection } from "astro:content";
import type { BookReaction } from "../types";

export function fetchAllBookReactions(): Promise<BookReaction[]> {
    return getCollection("books");
}