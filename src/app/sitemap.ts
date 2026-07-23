import { getPtLists } from "@/service/ptzone.service";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gymjjak.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pt/find`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.5,
    },
  ];

  try {
    const ptListsResponse = await getPtLists();

    const ptPages: MetadataRoute.Sitemap = ptListsResponse.data.map((pt) => ({
      url: `${baseUrl}/pt/${pt.ptCourseId}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticPages, ...ptPages];
  } catch (error) {
    console.error("sitemap PT 목록 생성 실패:", error);

    // API 장애여도 배포는 진행하고, 기본 페이지 sitemap만 제공
    return staticPages;
  }
}