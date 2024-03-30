"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

export default function CreaptePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const params = useSearchParams();

    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            const post = await fetch(`/api/prompt/${params.get('id')}`);
            const data = await post.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        fetchPost();
    }, [params.get('id')]);
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${params.get('id')}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })

                })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(">>>error>>", error);
        }
        finally {
            setSubmitting(false)

        }
    };

    return (
        <>
            <Form
                type="Update"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </>
    )
}