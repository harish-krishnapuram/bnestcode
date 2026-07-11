import { useState,useRef } from "react";
import Navbar from "../components/Navbar"
import CodeEditor from "../components/CodeEditor"
import LanguageSelector from "../components/LanguageSelector";
import api from "../services/api";
import { FaPlay } from "react-icons/fa";
import OutputPanel from "../components/OutputPanel";
const PracticeCode = ()=>{
    const outputRef = useRef()
    const [language,setLanguage] = useState('python')
    const [runcodeLoad,setRuncodeLoad] = useState(false)
    const [output, setOutput] = useState(null);
    const [code, setCode] = useState("");
    const handleLanguageChange = (lang) => {
        setLanguage(lang);

        if (lang === "python") {
            setCode(problem.starter_code_python);
        }

        if (lang === "javascript") {
            setCode(problem.starter_code_javascript);
        }

        if (lang === "java") {
            setCode(problem.starter_code_java);
        }
    };
    const runCustomCode = async () => {
        setRuncodeLoad(true);
    
        try {
            const response = await api.post("/run-code/", {
                code: code
            });
    
            setOutput(response.data);
    
        } catch (err) {
    
            if (err.response) {
                setOutput(err.response.data);
            } else {
                setOutput({
                    stdout: "",
                    stderr: "Unable to connect to server.",
                    return_code: -1
                });
            }
    
        } finally {
            setRuncodeLoad(false);
    
            setTimeout(() => {
                outputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    };
    return (
        <>
        <Navbar/>
        <div className="card shadow border-0 rounded-4 m-3">
            <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                <LanguageSelector
                language={language}
                setLanguage={handleLanguageChange}
                />
                <label className="ms-3 d-flex align-items-center justify-content-between">
                    <button
                        className="btn btn-success d-flex align-items-center gap-2 px-4 py-2 fw-semibold shadow-sm"
                        onClick={runCustomCode}
                        disabled={runcodeLoad}
                    >
                        <FaPlay size={14} />

                        {
                            runcodeLoad
                                ? "Running..."
                                : "Run Code"
                        }
                    </button>
                </label>
            </div>
            <CodeEditor language={"python"} code='#welcome to bnest platform practice problems'  setCode={setCode}/>
        </div>
        </div>
        <div className="card shadow border-0 rounded-4 m-3">
            <div ref={outputRef}>
            <OutputPanel output={output} />
            </div>
        </div>
        </>
    )
}

export default PracticeCode