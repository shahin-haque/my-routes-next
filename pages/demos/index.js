import Link from "next/link";

// Replace this with your actual data fetching logic

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const projects = await res.json();

  return { props: { projects } };
}

export default function Index({ projects }) {
  return (
    <main>
      <Link href="/">Go to home page</Link>
      <h1>This is /Demos page </h1>
      <h2>
        if you have entered your (domain name)/demos, then you will land on this
        page
      </h2>
      {projects.map((project) => (
        <section key={project.id}>
          <Link href={`demos/${project.id}`}>{project.title}</Link>
        </section>
      ))}
    </main>
  );
}
