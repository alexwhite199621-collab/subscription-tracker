import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js"

const aj = arcjet({
    // Get your site key from https://console.arcjet.com and set it as an environment (copied this from ArcJet Site)
    // variable rather than hard coding. (copied this from ArcJet Site)
    key: ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // Shield protects your app from common attacks such as SQL injection (copied this from ArcJet Site)
        shield({ mode: "LIVE" }),
        // Create a bot detection rule (copied this from ArcJet Site)
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only (copied this from ArcJet Site)
            // Block all bots except the following (copied this from ArcJet Site)
            allow: [
                "CATEGORY:SEARCH_ENGINE" // Google, Bing, etc
                // Uncomment to allow these other common bot categories (copied this from ArcJet Site)
                // See the full list at https://arcjet.com/bot-list (copied this from ArcJet Site)
                //"CATEGORY:MONITOR", // Uptime monitoring services (copied this from ArcJet Site)
                //"CATEGORY:PREVIEW", // Link previews such as Slack, Discord (copied this from ArcJet Site)
            ],
        }),
        // Create a token bucket rate limit. Other algorithms are supported. (copied this from ArcJet Site)
        tokenBucket({
            mode: "LIVE",
            // Tracked by IP address by default, but this can be customized (copied this from ArcJet Site)
            // See https://docs.arcjet.com/fingerprints (copied this from ArcJet Site)
            //characteristics: ["ip.src"], (copied this from ArcJet Site)
            refillRate: 5, // Refill 5 tokens per interval (copied this from ArcJet Site)
            interval: 10, // Refill every 10 seconds (copied this from ArcJet Site)
            capacity: 10, // Bucket capacity of 10 tokens (copied this from ArcJet Site)
        }),
    ],
});

export default aj;