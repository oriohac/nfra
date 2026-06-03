import { useEffect, useState } from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../api/api";

import "./singlepost.css";
import { BASE_URL } from "../../../config";

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
        src={post.image}
        alt={post.title}
      />

      <small>
        {new Date(
          post.createdAt
        ).toDateString()}
      </small>

      <h1>{post.title}</h1>

      <div
      className="full-post-content"
        dangerouslySetInnerHTML={{
          __html: post.content
        }}
      />

    </div>

  );

}