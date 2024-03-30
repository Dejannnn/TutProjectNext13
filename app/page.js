import Image from "next/image";
import Feed from "@components/Feed"

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover & Share
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-center">AI-Powerd Prompts</span>
      </h1>
      <p className="desc text-center">Prooptopia is an open-soure AI promting tool for modern world discover, 
        create and shere creative propts</p>
    <Feed />

    </section>
  );
}
