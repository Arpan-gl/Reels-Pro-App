"use client";
import { ImageKitProvider } from "imagekitio-next";
import axios from "axios";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
    try {
        const response = await axios.get("/api/imagekit-auth");
        const { signature, expire, token } = response.data;
        return { signature, expire, token };
    } catch (error: any) {
        console.error("Failed to authenticate with ImageKit:", error);
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
    );
}