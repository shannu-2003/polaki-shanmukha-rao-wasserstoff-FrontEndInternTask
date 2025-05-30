import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { ySyncPlugin, yCursorPlugin, yUndoPlugin } from 'y-prosemirror';
import { v4 as uuidv4 } from 'uuid';

const CollaborativeEditor = () => {
  const [username] = useState(`User-${Math.floor(Math.random() * 1000)}`);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider('wasserstoff-room', ydoc);
    const yXmlFragment = ydoc.getXmlFragment('prosemirror');

    const awareness = provider.awareness;
    awareness.setLocalStateField('user', {
      name: username,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    });

    const tiptapEditor = useEditor({
      extensions: [StarterKit],
      content: '',
      editorProps: {
        attributes: {
          class: 'prose prose-lg p-4 rounded bg-white shadow-md min-h-[300px]',
        },
      },
    });

    if (tiptapEditor) {
      tiptapEditor.view.setProps({
        plugins: [
          ySyncPlugin(yXmlFragment),
          yCursorPlugin(provider.awareness),
          yUndoPlugin(),
          ...tiptapEditor.view.props.plugins,
        ],
      });

      setEditor(tiptapEditor);
    }

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Real-Time Collaborative Editor</h2>
      <p className="mb-4 text-gray-600">
        Logged in as: <span className="font-semibold">{username}</span>
      </p>
      {editor && <EditorContent editor={editor} />}
    </div>
  );
};

export default CollaborativeEditor;
