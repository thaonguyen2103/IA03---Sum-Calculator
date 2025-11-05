import React, { useState } from 'react';
import styles from '../sumCalculator/styles.module.css';

function SumCalculator() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const validateInput = (value) => {
        // Cho phép số hoặc chuỗi rỗng
        return value === '' || !isNaN(value);
    };

    const handleCalculate = () => {
        setError('');
        setResult(null);

        if (number1 === '' || number2 === '') {
            setError('Please enter both numbers');
            return;
        }

        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);

        if (isNaN(num1) || isNaN(num2)) {
            setError('Please enter valid numbers only');
            return;
        }

        const sum = num1 + num2;
        setResult(sum);
    };

    const handleNumber1Change = (e) => {
        const value = e.target.value;
        setNumber1(value);
        setResult(null); //  clear result khi user nhập lại

        if (!validateInput(value)) {
            setError('Please enter valid numbers only');
        } else {
            setError('');
        }
    };

    const handleNumber2Change = (e) => {
        const value = e.target.value;
        setNumber2(value);
        setResult(null); //  clear result khi user nhập lại

        if (!validateInput(value)) {
            setError('Please enter valid numbers only');
        } else {
            setError('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCalculate();
        }
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

                        <button onClick={handleCalculate} className={styles.button}>
                            Calculate Sum
                        </button>

                        {error && (
                            <div className={styles.errorBox}>
                                <p className={styles.errorText}>{error}</p>
                            </div>
                        )}

                        {result !== null && !error && (
                            <div className={styles.resultBox}>
                                <p className={styles.resultLabel}>Result:</p>
                                <p className={styles.resultValue}>{result}</p>
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
