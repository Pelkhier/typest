import type { RequestHandler } from "@sveltejs/kit";
import DeviceDetector from "device-detector-js";
// TODO : this might block search engine bots which would cause bad SEO, so it needs to be more explicit condition block than just blocking all devices other than desktop
export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    if (body.userAgent) {
        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(body.userAgent);
        if (device.device?.type !== "desktop") {
            return new Response("Not supported", { status: 405 });
        }
        return new Response();
    }
    return new Response("Not supported", { status: 405 });
};
