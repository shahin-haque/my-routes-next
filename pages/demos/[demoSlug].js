import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
  // Replace with your logic to fetch possible slugs

  const slugs = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(
    (res) => res.json()
  );

  return {
    paths: slugs.map((slug) => ({ params: { demoSlug: slug.toString() } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { demoSlug } = params;

  // Replace this with your actual data fetching logic

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${demoSlug}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
    revalidate: 60, // Optional: Revalidate data every 60 seconds
  };
}

export default function Demo({ data }) {
  const router = useRouter();
  const [slug, setSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { demoSlug } = router.query;

    if (demoSlug) {
      setSlug(demoSlug);
      setLoading(false);
    }
  }, [router.query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data ? (
        <div>
          <Link href="/demos">Go to demos page</Link>
          <hr />

          {/* Render the fetched data here */}

          {/* {data.title} */}

          {/* Render the fetched data here */}

          <div className="remove">
            {!Number(slug)
              ? "To access this dumy api data please insert numeric number also known as “numerals” or “digits” grater then 0  in the URL == because i am getting dynamic data based on th id == Replace this with your actual data fetching logic & Replace with your logic to fetch possible slugs and remove this div"
              : `SlugId ${slug} &Title: ${data.title}}`}
          </div>
        </div>
      ) : (
        <div>
          <h3>No data found for slug: {slug}</h3>
        </div>
      )}
    </div>
  );
}
