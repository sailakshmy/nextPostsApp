"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }
  if (errors.length > 0) {
    return { errors };
  }
  let imageURL;
  try {
    imageURL = await uploadImage(image);
  } catch (e) {
    throw new Error(
      "Image upload failed, post could not be created. Please try again!"
    );
  }
  await storePost({
    imageUrl: imageURL,
    title,
    content,
    userId: 1,
  });
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
