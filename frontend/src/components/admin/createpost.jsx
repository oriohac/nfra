import { useState } from "react";

import api from "../../api/api";
import { toast } from "react-toastify";
import "./createpost.css"
import imageCompression from "browser-image-compression";
import PostEditor from "../editor/posteditor";

export default function CreatePost() {


    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", title);

            formData.append("content", content);

            formData.append("image", image);



            await api.post(
                "/posts",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    }
                }
            );

            toast.info("Post created");
            setTitle("");

            setContent("");

            setImage(null);

        } catch (error) {

            console.log(error);

        }

    };




    return (


        <div className="create-post-container">

            <h2>Create Post</h2>

            <form
                className="create-post-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Post title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <input
                    type="file"
                    placeholder="Post Image"
                    accept="image/*"
                    onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const compressedFile = await imageCompression(
                            file,
                            {
                                maxSizeMB: 0.4,
                                maxWidthOrHeight: 1200
                            }
                        );

                        setImage(compressedFile);

                        setPreview(
                            URL.createObjectURL(
                                compressedFile
                            )
                        );
                    }
                    }
                />
                {preview && (

                    <img
                        src={preview}
                        alt="preview"
                        style={{
                            width: "200px",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}
                    />

                )
                }



                {/* <textarea
                    placeholder="Post content"
                    rows="6"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                /> */}

                <PostEditor

                    content={content}

                    setContent={setContent}

                />


                <button type="submit">
                    Publish Post
                </button>

            </form>

        </div>



    );

}