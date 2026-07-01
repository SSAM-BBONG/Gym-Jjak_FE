import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/mypage/']
            }
        ],
        sitemap: `https://13.124.200.97.sslip.io/sitemap.xml`
    }
}