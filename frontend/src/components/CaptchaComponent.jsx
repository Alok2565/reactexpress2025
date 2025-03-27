import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { FiRefreshCcw } from "react-icons/fi"; // Refresh icon

const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const CaptchaComponent = ({ onVerify }) => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const canvasRef = useRef(null);

    useEffect(() => {
        drawCaptcha();
    }, [captcha]);

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous CAPTCHA

        // Set background color
        ctx.fillStyle = "#f3f3f3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add random lines for distortion
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
            ctx.lineWidth = Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Draw CAPTCHA text
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(captcha, canvas.width / 2, canvas.height / 2);
    };

    const handleRefresh = (e) => {
        if (e) e.preventDefault(); // Prevent form submission only if event exists
        setCaptcha(generateCaptcha()); // Regenerate CAPTCHA
        setError(""); // Clear error message
        setInput(""); // Clear input field
    };

    const handleVerify = () => {
        if (input === captcha) {
            onVerify();
        } else {
            setError("Incorrect CAPTCHA. Try again!");
            setInput(""); // Clear input field but keep CAPTCHA
        }
    };
    return (
        <>
            <Col className=" col-md-12 m-3">
                <Form.Group className="d-flex gap-2">
                    <canvas ref={canvasRef} width="150" height="30" className="border rounded-md" />
                    <Button
                        onClick={handleRefresh}
                        className="bg-red-500 text-white rounded-full hover:bg-red-700 transition"
                        title="Refresh CAPTCHA"
                    >
                        <FiRefreshCcw size={15} />
                    </Button>
                </Form.Group>

                <Form.Group className="d-flex gap-2" controlId="formCaptch">
                    <Form.Control type="text" value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="input input-bordered w-full mt-2"
                        placeholder="Enter CAPTCHA" />

                    <Button onClick={handleVerify} className="btn btn-primary w-full mt-2">
                        Verify
                    </Button>
                </Form.Group>
                {error && <p className="text-danger text-sm mt-1">{error}</p>}

            </Col>
        </>

    );
};

export default CaptchaComponent;
