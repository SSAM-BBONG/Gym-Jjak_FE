import { getPtLists } from "@/service/ptzone.service";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = 'https://gymjjak.com';

    const staticPages = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1
        },
        {
            url: `${baseUrl}/pt`,
            lastModified: new Date(),
            changeFrequency: 'hourly' as const,
            priority: 0.9
        },
        {
            url: `${baseUrl}/pt/find`,
            lastModified: new Date(),
            changeFrequency: 'hourly' as const,
            priority: 0.5
        },
    ]

    //2. 동적 페이지
    const ptListsResponse = await getPtLists();
    const ptPages = ptListsResponse.data.map((pt) => ({
        url: `${baseUrl}/pt/${pt.ptCourseId}`,
        // lastModified: new Date(pt.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8
    }))

    return [...staticPages, ...ptPages]
}