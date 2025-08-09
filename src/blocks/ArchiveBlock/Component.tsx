import { getPayload } from "payload";

import { CollectionArchive } from "@/components/CollectionArchive";
import RichText from "@/components/RichText";
import config from "@payload-config";

import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

export const ArchiveBlock = async (
  props: ArchiveBlockProps & {
    id?: string;
  },
) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props;

  const limit = limitFromProps ?? 3;

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value;
      }) as Post[];

      posts = filteredSelectedPosts;
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  );
};
