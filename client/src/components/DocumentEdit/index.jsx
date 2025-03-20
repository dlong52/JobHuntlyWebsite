import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const DocumentEditor = () => {
  const [content, setContent] = useState("");

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>📝 Document Editor</h2>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <button
        onClick={() => console.log(content)}
        style={{
          marginTop: "10px",
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Document
      </button>
    </div>
  );
};

export default DocumentEditor;
