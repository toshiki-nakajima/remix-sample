export default function ThanksPage() {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Thanks</h1>
            <button
                style={{ marginTop: "1rem" }}
                onClick={() => window.history.back()}
            >
                Back
            </button>
        </div>
    );
}