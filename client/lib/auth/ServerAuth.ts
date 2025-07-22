import { authConfig } from "@/config/auth.config";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { clearCookies } from "./cookie";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export type TAuthUser = {
    userId: string;
    name: string;
    email: string;
};

export class ServerAuth {
    static async token_decrypt(session: string | undefined = "") {
        try {
            const { payload } = await jwtVerify(session, secret, {
                algorithms: ["HS256"],
            });
            return payload;
        } catch (error) {
            console.error("Failed to verify session", (error as Error).message);
        }
    }

    static async get_server_session(): Promise<any | null> {
        const cookieData = (await cookies()).get(authConfig.jwt.cookieName)?.value;
        if (!cookieData) return null;
        return await this.token_decrypt(cookieData);
    }

    static async serverUser() {
        const cookieData = await this.get_server_session();

        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(cookieData);
            }, 1000),
        );
    }

    static async signOut() {
        await clearCookies();
    }
}
