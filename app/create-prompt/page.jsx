"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export default function CreaptePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const {data: session} = useSession();
    const router = useRouter();


    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session.user.id,
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
            <h1>CreatePrompt</h1>
            <Form
                type="Create"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPrompt}
            />
        </>
    )
}