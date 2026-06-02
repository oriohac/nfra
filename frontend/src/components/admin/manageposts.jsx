import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {

  FaTrash,
  FaEdit

} from "react-icons/fa";

import api from "../../api/api";

import { toast } from "react-toastify";

import "./manageposts.css";

export default function ManagePostsPage() {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  // const [editingPost, setEditingPost] =  useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null);

  // const [title, setTitle] = useState("");

  // const [content, setContent] = useState("");

  // const [image, setImage] = useState(null);

  useEffect(() => {

    fetchPosts();

  }, []);

  const fetchPosts = async () => {

    try {

      const response =
        await api.get("/posts");

      setPosts(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const openDeleteModal = (id) => {

    setSelectedPostId(id);

    setShowDeleteModal(true);

  };

  const deletePost = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(

        `/posts/${selectedPostId}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      toast.success("Post deleted");

      setShowDeleteModal(false);

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

      const token =
        localStorage.getItem("token");

      const data = new FormData();

      data.append("title", title);

      data.append("content", content);

      if (image) {

        data.append("image", image);

      }

      await api.patch(

        `/posts/${editingPost}`,

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

      toast.success("Post updated");

      setEditingPost(null);

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  function stripHtml(html) {

  const doc =
    new DOMParser()
      .parseFromString(
        html,
        "text/html"
      );

  return doc.body.textContent || "";
}

  return (

    <div className="manage-posts-page">

      <h2>Manage Posts</h2>

      {

        posts.map((post) => (

          <div
            className="post-tile"
            key={post._id}
          >

            <img

              className="post-image"

              src={
                `http://localhost:5000${post.image}`
              }

              alt={post.title}

            />

            <div className="post-info">

              

                {/* // editingPost === post._id

                // ?

                // <>

                //   <input
                //     value={title}
                //     onChange={(e) =>
                //       setTitle(
                //         e.target.value
                //       )
                //     }
                //   />

                //   <textarea
                //     rows="5"
                //     value={content}
                //     onChange={(e) =>
                //       setContent(
                //         e.target.value
                //       )
                //     }
                //   />

                //   <input
                //     type="file"
                //     onChange={(e) =>
                //       setImage(
                //         e.target.files[0]
                //       )
                //     }
                //   />

                //   <button
                //     onClick={updatePost}
                //   >
                //     Save
                //   </button>

                // </>

                // : */}

                

                  <h3>{post.title}</h3>

                  

                  <p>

                    {
                      stripHtml(post.content)
                        .slice(0, 120)
                    }

                    ...

                  </p>

               

              

            </div>


                <div className="post-actions">

                  <FaEdit

                    className="action-icon"

                    onClick={() =>
                      navigate(`/admin/edit-post/${post._id}`)
                      // startEdit(post)
                    }

                  />

                  <FaTrash

                    className="action-icon delete"

                    onClick={() =>
                      openDeleteModal(
                        post._id
                      )
                    }

                  />

                </div>

             

          </div>

        ))

      }

      {

        showDeleteModal && (

          <div className="modal-overlay">

            <div className="delete-modal">

              <h3>
                Delete Post?
              </h3>

              <p>
                Are you sure you want
                to delete this post?
              </p>

              <div className="modal-actions">

                <button
                  onClick={deletePost}
                >
                  Confirm
                </button>

                <button
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

}