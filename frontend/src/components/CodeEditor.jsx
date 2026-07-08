import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode }) => {
    return (
        <Editor
            height="500px"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            options={{
                minimap: {
                    enabled: false,
                },
                fontSize: 15,
                automaticLayout: true,
                scrollBeyondLastLine: false,
            }}
        />
    );
};

export default CodeEditor;