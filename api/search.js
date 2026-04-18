export default async function handler(req, res) {
    try {
        const rawKeyword = req.query.keyword;

        if (!rawKeyword) {
            return res.status(400).json({ error: "Missing keyword" });
        }

        const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(rawKeyword)}&limit=30`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "reddit-heatmap-app/1.0"
            }
        });

        if (!response.ok) {
            return res.status(500).json({
                error: "Reddit API failed",
                status: response.status
            });
        }

        const data = await response.json();

        const children = data?.data?.children;

        if (!Array.isArray(children)) {
            return res.status(500).json({
                error: "Invalid Reddit response structure"
            });
        }

        const posts = children.slice(0, 30).map(item => {
            const post = item.data;

            return {
                title: post.title,
                subreddit: post.subreddit_name_prefixed,
                upvotes: post.ups,
                ratio: post.upvote_ratio,
                permalink: `https://reddit.com${post.permalink}`
            };
        });

        return res.status(200).json({
            keyword: rawKeyword,
            posts
        });

    } catch (err) {
        return res.status(500).json({
            error: "Server crash",
            message: err.message
        });
    }
}