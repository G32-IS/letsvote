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
    `<h2>Inserisci qui il testo che apparirà nella schermata di votazione</h2>
    <p>Questo testo non è obbligatorio</p>`;

const controls = [
    [<RichTextEditor.Bold key={1}/>, <RichTextEditor.Italic key={2}/>, <RichTextEditor.Underline key={3}/>, <RichTextEditor.Strikethrough key={4}/>, <RichTextEditor.ClearFormatting key={5}/>, <RichTextEditor.Highlight key={6}/>, <RichTextEditor.Code key={7}/>],
    [<RichTextEditor.H1 key={8}/>, <RichTextEditor.H2 key={9}/>, <RichTextEditor.H3 key={10}/>, <RichTextEditor.H4 key={11}/>],
    [<RichTextEditor.Blockquote key={12}/>, <RichTextEditor.Hr key={13}/>, <RichTextEditor.BulletList key={14}/>, <RichTextEditor.OrderedList key={15}/>, <RichTextEditor.Subscript key={16}/>, <RichTextEditor.Superscript key={17}/>],
    [<RichTextEditor.Link key={18}/>, <RichTextEditor.Unlink key={19}/>],
    [<RichTextEditor.AlignLeft key={20}/>, <RichTextEditor.AlignCenter key={2}/>, <RichTextEditor.AlignJustify key={21}/>, <RichTextEditor.AlignRight key={22}/>],
    [<RichTextEditor.Undo key={23}/>, <RichTextEditor.Redo key={24}/>],
]

type Props = {
    body: string | undefined,
    setBody: (val: string | undefined) => void
}

const TextEditor = ({ body, setBody }: Props) => {
    
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
        onUpdate: ({ editor }) => { setBody(editor.getHTML()); }
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