const LanguageSelector = ({ language, setLanguage }) => {
    return (
        <select
            className="form-select w-auto"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            <option value="python">Python</option>
            {/* <option value="javascript">JavaScript</option>
            <option value="java">Java</option> */}
        </select>
    );
};

export default LanguageSelector;