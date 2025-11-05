import React, { useState } from 'react';
import styles from '../sumCalculator/styles.module.css';

function SumCalculator() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        setError('');
        setResult(null);

        if (number1 === '' || number2 === '') {
            setError('Please enter both numbers');
            return;
        }

        const validNumberPattern = /^-?\d*\.?\d*$/;
        if (!validNumberPattern.test(number1) || !validNumberPattern.test(number2)) {
            setError('Invalid input: Please enter valid numeric values only');
            return;
        }

        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);

        if (isNaN(num1) || isNaN(num2)) {
            setError('Please enter valid numbers');
            return;
        }

        const sum = num1 + num2;

        // Format kết quả theo hàng nghìn, làm tròn 3 chữ số thập phân
        const formattedSum = sum.toLocaleString('en-US', {
            maximumFractionDigits: 3,
        });

        setResult(formattedSum);
    };

    const handleNumber1Change = (e) => {
        const value = e.target.value;
        if (/^-?\d*\.?\d*$/.test(value) || value === '') {
            setNumber1(value);
            setError('');
            setResult(null);
        }
    };

    const handleNumber2Change = (e) => {
        const value = e.target.value;
        if (/^-?\d*\.?\d*$/.test(value) || value === '') {
            setNumber2(value);
            setError('');
            setResult(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleCalculate();
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.calculator}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Sum Calculator</h1>
                        <p className={styles.subtitle}>Enter two numbers to calculate their sum</p>
                    </div>

                    <div>
                        {/* Number 1 */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Number 1:</label>
                            <input
                                type="text"
                                value={number1}
                                onChange={handleNumber1Change}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter first number"
                                className={styles.input}
                            />
                        </div>

                        {/* Number 2 */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Number 2:</label>
                            <input
                                type="text"
                                value={number2}
                                onChange={handleNumber2Change}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter second number"
                                className={styles.input}
                            />
                        </div>

                        {/* Button */}
                        <button onClick={handleCalculate} className={styles.button}>
                            Calculate Sum
                        </button>

                        {/* Error box */}
                        {error && (
                            <div className={styles.errorBox}>
                                <p className={styles.errorText}>{error}</p>
                            </div>
                        )}

                        {/* Result box */}
                        {result !== null && !error && (
                            <div className={styles.resultBox}>
                                <p className={styles.resultLabel}>Result:</p>
                                <p
                                    className={styles.resultValue}
                                    title={result} // Hiển thị tooltip khi hover
                                >
                                    {/* Nếu kết quả dài hơn 15 ký tự thì rút gọn + thêm dấu “…” */}
                                    {String(result).length > 15
                                        ? String(result).slice(0, 15) + '…'
                                        : result}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return <SumCalculator />;
}
    