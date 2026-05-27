import { useEffect, useState } from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../api/api";

import "./singlepost.css";

export default function SinglePost() {

  const { id } = useParams();

  const [post, setPost] =
    useState(null);

  useEffect(() => {

    const fetchPost = async () => {

      try {

        const response =
          await api.get(
            `/posts/${id}`
          );

        setPost(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchPost();

  }, [id]);

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="single-post-page">

      <img
        src={`http://localhost:5000${post.image}`}
        alt={post.title}
      />

      <small>
        {new Date(
          post.createdAt
        ).toDateString()}
      </small>

      <h1>{post.title}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: post.content
        }}
      />

    </div>

  );

}