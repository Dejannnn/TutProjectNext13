"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@components/Profile'

export default function MyProfile() {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        try {
            await fetch(`/api/prompt/${post._id}`, {method: 'DELETE'});

            setPosts(posts.filter(p => p._id !== post._id));
        } catch (error) {
            console.log(">>>>error", error);
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const posts = await response.json();
            setPosts(posts);
        }

        session?.user.id && fetchPosts();
    }, [])

    return (
        <Profile
            name="my"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        ></Profile>
    )
}