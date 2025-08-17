/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'img.clerk.com'], // ✅ Added Cloudinary
    }
};

export default nextConfig;
