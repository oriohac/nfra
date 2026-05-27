import { useEffect, useState } from "react";

import api from "../../api/api";

import { toast } from "react-toastify";

import "./manageposts.css";

export default function ManagePosts() {

  const [posts, setPosts] = useState([]);

  const [editingPost, setEditingPost] = useState(null);

  const [title, setTitle] = useState("");

  const [content, setContent] =  useState("");

  const fetchPosts = async () => {

    try {

      const response = await api.get("/posts");

      setPosts(Array.isArray(response.data)
        ? response.data 
        : []);

    } catch (error) {

      console.log(error);
      setPosts([]);

    }

  };

  useEffect(() => {

    fetchPosts();

  }, []);

  const deletePost = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(
        `/posts/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Post deleted"
      );

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  const startEdit = (post) => {

    setEditingPost(post._id);

    setTitle(post.title);

    setContent(post.content);

  };

  const updatePost = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.patch(

        `/posts/${editingPost}`,

        {
          title,
          content
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      toast.success(
        "Post updated"
      );

      setEditingPost(null);

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="manage-posts">

      <h2>Manage Posts</h2>

      <div className="manage-posts-grid">

        {posts.length === 0 
        ? <p>No posts yet.</p> 
        : posts.map((post) => (

          <div
            className="manage-post-card"
            key={post._id}
          >

            <img
              src={`http://localhost:5000${post.image}`}
              alt={post.title}
            />

            {

              editingPost === post._id

              ?

              <>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

                <textarea
                  rows="5"
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                />

                <button
                  onClick={updatePost}
                >
                  Save
                </button>

              </>

              :

              <>

                <h3>{post.title}</h3>

                <p>{post.content}</p>

                <div className="post-actions">

                  <button
                    onClick={() =>
                      startEdit(post)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deletePost(post._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </>

            }

          </div>

        ))}

      </div>

    </div>

  );

}