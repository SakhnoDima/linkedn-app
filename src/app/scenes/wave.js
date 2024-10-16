"use client";

import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';


const ThreeScene = () => {
    const refContainer = useRef(null);

    useEffect(() => {
// Створення сцени
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);  // Прозорий фон
        refContainer.current && refContainer.current.appendChild( renderer.domElement );


// Додай стилі для канвасу
//         renderer.domElement.style.position = 'absolute';
//         renderer.domElement.style.top = '0';
//         renderer.domElement.style.right = '0';
        // renderer.domElement.style.zIndex = '99';

// Створення точки
        const dotGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const dotMaterial = new THREE.MeshBasicMaterial({color: 0x4f46e5});

// Параметри для хвилі
        const dotSpacing = 1;  // Відстань між точками
        const waveHeight = 5;  // Висота хвилі
        const waveWidth = 10;  // Довжина хвилі
        const numRows = 40;    // Кількість рядів точок
        const numCols = 80;   // Кількість точок у ряді
        let time = 0;

// Створення хвилі з точок
        const dots = [];
        for (let i = 0; i < numRows; i++) {
            // let y = Math.sin(i);
            for (let j = 0; j < numCols; j++) {
                const dot = new THREE.Mesh(dotGeometry, dotMaterial);

                // Встановлюємо позицію точки для створення хвилі
                const z = i * dotSpacing - (numRows / 2) * dotSpacing;
                const x = j * dotSpacing / 2 - (numCols / 2) * dotSpacing;
                let y = Math.sin(j / waveWidth) * waveHeight;

                dot.position.set(x, y, z);
                scene.add(dot);
                dots.push(dot);
            }
        }

// Позиція камери
        camera.position.z = 26;
        camera.position.x = -6;
        camera.position.y = -3;
        camera.rotation.z = -0.2;
        camera.rotation.x = 0.7;
        camera.rotation.y = 0.5;

// Функція для інтерполяції між двома значеннями (від фіолетового до сірого)
        function interpolateColor(t) {
            const grayColor = new THREE.Color(0x808080); // Сірий
            const mainColor = new THREE.Color(0x4A00FF); // Фіолетовий

            // Інтерполяція між основним кольором і сірим залежно від t
            return mainColor.lerp(grayColor, t);
        }

// Анімація (якщо потрібна)
        function animate() {

            requestAnimationFrame(animate);

            time += 0.02;

            dots.forEach((dot, index) => {

                // const xPos = dot.position.x;
                // const normalizedX = (xPos + (numCols / 2) * dotSpacing) / ((numCols / 2) * dotSpacing); // Нормалізація по X
                //
                // // Переливання кольорів вздовж осі X (від фіолетового до сірого)
                // const colorValue = interpolateColor(normalizedX);
                // dot.material.color.set(colorValue);

                // Переливання кольорів
                // const colorValue = 0.75 + Math.sin(time + index * 0.1) * 0.25;
                // dot.material.color.setHSL(colorValue, 1, 0.5);

                // Зміна розміру точки
                // const scale = 1 + Math.sin(time + index * 0.1) * 0.5; // Плавна зміна масштабу
                const scale = 0.75 + Math.sin(time + index * 0.1) * 0.25;  // Плавна зміна від 0.7 до 1.3
                dot.scale.set(scale, scale, scale);
            });

            renderer.render(scene, camera);
        }

        animate();

// Оновлення розміру canvas при зміні розміру вікна
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            // Only remove the child if mountRef.current exists
            if (refContainer.current) {
                refContainer.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
            renderer.dispose(); // Dispose the renderer
        };
    }, []);
    return (
        <div ref={refContainer} className='absolute w-full h-full bottom-0 right-0 overflow-hidden pointer-events-none'></div>
    );
};

export default ThreeScene;

