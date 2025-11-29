import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentRoot = path.join(process.cwd(), "content");

export async function getPost(lang: string, slug: string) {
    const contentDir = path.join(contentRoot, lang);
    const filePath = path.join(contentDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Post '${slug}' not found in language '${lang}'`);
    }

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
        lang,
    };
}

export function getAllPosts(lang: string) {
    const contentDir = path.join(contentRoot, lang);

    if (!fs.existsSync(contentDir)) return [];

    const files = fs
        .readdirSync(contentDir, { withFileTypes: true })
        .filter((file) => file.isFile() && file.name.endsWith(".md"))
        .map((file) => file.name);

    return files.map((filename) => {
        const fileContents = fs.readFileSync(
            path.join(contentDir, filename),
            "utf8"
        );

        const { data } = matter(fileContents);
        const slug = filename.replace(/\.md$/, "");

        return {
            slug,
            title: data.title,
            author: data.author,
            genre: data.genre,
            lang,
        };
    });
}
