'use client';
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function ContentEditor({editorRef}:{editorRef: React.MutableRefObject<any>}) {
  return (
    <Editor
        apiKey={process.env.NEXT_PUBLIC_EDITOR}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "fullscreen",
              "insertdatetime",
              "media",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
          tinycomments_mode: 'embedded',
          tinycomments_author: '',
          ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("Not in use")),
          // mergetags_list: [
          //   { value: 'First.Name', title: 'First Name' },
          //   { value: 'Email', title: 'Email' },
          // ],        
          content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        initialValue=""
    />  
  );
}