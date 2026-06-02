import {

  useEditor,
  EditorContent

} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";
import { useEffect } from "react";

import "./posteditor.css";

export default function PostEditor({

  content,

  setContent

}) {

  const editor = useEditor({

    extensions: [

      StarterKit,

      Link.configure({

        openOnClick: true,

        autolink: true

      })

    ],

   content: content || "",

    onUpdate: ({ editor }) => {

      setContent(
        editor.getHTML()
      );

    }

  });

  useEffect(() => {

  if (
    editor &&
    content !== editor.getHTML()
  ) {

    editor.commands.setContent(
      content || ""
    );

  }

}, [content, editor]);

  if (!editor) return null;

  return (

    <div className="editor-wrapper">

      <div className="editor-toolbar">

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => {

            const url =
              prompt("Enter URL");

            if (url) {

              editor
                .chain()
                .focus()
                .setLink({ href: url })
                .run();

            }

          }}
        >
          Link
        </button>

      </div>

      <EditorContent
        editor={editor}
        className="editor-content"
      />

    </div>

  );

}