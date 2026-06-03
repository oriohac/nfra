import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/api";

import { toast } from "react-toastify";

import "./editpost.css";

import PostEditor from "../editor/posteditor";
import { BASE_URL } from "../../../config";

export default function EditPostPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] =
    useState(null);

  const [content, setContent] =
    useState(null);

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  useEffect(() => {

    fetchPost();

  }, []);

  const fetchPost = async () => {

    try {

      const response =
        await api.get(`/posts/${id}`);

      const post = response.data;

      setTitle(post.title);

      setContent(post.content);

      setPreview(
        post.image
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    }

  };

  const updatePost = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const data = new FormData();

      data.append("title", title);

      data.append("content", content);

      if (image) {

        data.append("image", image);

      }

      await api.patch(

        `/posts/${id}`,

        data,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data"

          }
        }

      );

      toast.success(
        "Post updated"
      );

      navigate(
        "/admin/manage-posts"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update post"
      );

    }

  };

  return (

    <div className="edit-post-page">

      <div className="edit-post-card">

        <h2>Edit Post</h2>

        <img
          src={preview}
          alt="preview"
          className="edit-preview"
        />

        <input
          type="file"
          onChange={handleImageChange}
        />

        <input
          type="text"
          value={title}
          placeholder="Post title"
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        {/* <textarea
          rows="10"
          value={content}
          placeholder="Post content"
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
        /> */}

        <PostEditor

          content={content}

          setContent={setContent}

        />



        <div className="edit-actions">

          <button
            className="cancel-btn"
            onClick={() =>
              navigate(
                "/admin/manage-posts"
              )
            }
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={updatePost}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );

}