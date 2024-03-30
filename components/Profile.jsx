import PromptCard from "./PromptCard";


export default function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head-text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map(post => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => { handleEdit(post) }}
              handleDelete={() => { handleDelete(post) }}
            />
          )
        })}
      </div>
    </section>
  );
}