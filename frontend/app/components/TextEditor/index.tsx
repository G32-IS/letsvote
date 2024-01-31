import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import styles from "./textEditor.module.css"

const content =
    '<h2 style="text-align: center;">Inserisci qui il testo</h2><p>testo di prova</p>';

const controls = [
    [<RichTextEditor.Bold />, <RichTextEditor.Italic />, <RichTextEditor.Underline />, <RichTextEditor.Strikethrough />, <RichTextEditor.ClearFormatting />, <RichTextEditor.Highlight />, <RichTextEditor.Code />],
    [<RichTextEditor.H1 />, <RichTextEditor.H2 />, <RichTextEditor.H3 />, <RichTextEditor.H4 />],
    [<RichTextEditor.Blockquote />, <RichTextEditor.Hr />, <RichTextEditor.BulletList />, <RichTextEditor.OrderedList />, <RichTextEditor.Subscript />, <RichTextEditor.Superscript />],
    [<RichTextEditor.Link />, <RichTextEditor.Unlink />],
    [<RichTextEditor.AlignLeft />, <RichTextEditor.AlignCenter />, <RichTextEditor.AlignJustify />, <RichTextEditor.AlignRight />],
    [<RichTextEditor.Undo />, <RichTextEditor.Redo />],
]

const TextEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
    });

    return (
        <RichTextEditor editor={editor} className={styles.editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60} className={styles.toolBar}>
                {controls.map((control, index) => {
                    return (
                        <RichTextEditor.ControlsGroup key={index} className={styles.controlGroup}>

                            {control.map((value, index) => (
                                <div className={styles.control} key={index}>{value}</div>
                            ))}
                        </RichTextEditor.ControlsGroup>
                    )
                })}
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content className={styles.content}/>
        </RichTextEditor>
    );
}

export default TextEditor