import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import "./allposts.css";

export default function AllPosts() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);



    const fetchPosts = async () => {

        try {

            const response =
                await api.get(
                    `/posts?page=${page}`
                );

            setPosts(
                response.data.posts
            );

            setTotalPages(
                response.data.totalPages
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const response =
                    await api.get("/posts");

                setPosts(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchPosts();

    }, [page]);

    return (

        <div className="all-posts-page">

            <h1>All Posts</h1>

            <div className="posts-grid">

                {posts.map((post) => (

                    <div
                        key={post._id}
                        className="post-card"
                        onClick={() =>
                            navigate(`/posts/${post._id}`)
                        }
                    >

                        <img
                            src={`http://localhost:5000${post.image}`}
                            alt={post.title}
                        />

                        <div className="post-content">

                            <small>
                                {new Date(
                                    post.createdAt
                                ).toDateString()}
                            </small>

                            <h3>{post.title}</h3>

                            <p>{post.content}</p>

                        </div>

                    </div>

                ))}

            </div>

            <div className="pagination">

                {[...Array(totalPages)]
                    .map((_, index) => (

                        <button
                            key={index}
                            onClick={() =>
                                setPage(index + 1)
                            }

                            className={
                                page === index + 1
                                    ? "active-page"
                                    : ""
                            }
                        >
                            {index + 1}
                        </button>

                    ))}

            </div>

        </div>

    );

}