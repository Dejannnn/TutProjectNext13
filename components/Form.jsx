
import Link from "next/link";

export default function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (

    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing propts with the world,
        and let yout imigination run wild any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphisam"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            className="form_textarea"
            placeholder="Write your prompt here...."
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">(#product #development #testing)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            className="form_input"
            placeholder="#tag"
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link 
          className="text-gray-500 text-sm"
          href="/"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...`: type}
          </button>
        </div>
      </form>
    </section>
  );
}