import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export async function getPost(slug: string) {
    const filePath = path.join(contentDir, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        title: data.title,
        author: data.author,
        genre: data.genre,
    };
}

export function getAllPosts() {
    const files = fs.readdirSync(contentDir);

    return files.map((filename) => {
        const fileContents = fs.readFileSync(path.join(contentDir, filename), "utf8");
        const { data } = matter(fileContents);
        const slug = filename.replace(/\.md$/, "");

        return {
            slug,
            title: data.title,
            author: data.author,
            genre: data.genre,
        };
    });
}
