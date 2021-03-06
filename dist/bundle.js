/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst g = {};\r\n\r\ng.loader = new THREE.TextureLoader();\r\n\r\nconst webcamElement = document.querySelector('#webcam');\r\nconst canvasElement = document.querySelector('#webcam__canvas');\r\nconst threejs = document.querySelector('#threejs');\r\n\r\nwindow.THREE.FileLoader.prototype.setRequestHeader('crossOrigin', '')\r\n\r\nconst base = \"http://localhost:3031\"; // https://collectivesun.samenschool.org/server\r\n\r\ng.spheres = [];\r\ng.geometry = new THREE.SphereGeometry(5, 64, 64);\r\n\r\n\r\nconsole.log('\"ok');\r\n\r\nconst initPicture = () => {\r\n    const webcam = new Webcam(webcamElement, 'user', canvasElement);\r\n\r\n    webcam.start().then((result) => {\r\n        setTimeout(() => {\r\n            var picture = webcam.snap();\r\n            sendPicture(picture);\r\n        }, 500);\r\n    });\r\n\r\n    const sendPicture = (picture) => {\r\n        let formData = new FormData();\r\n        formData.append('myFile', picture);\r\n\r\n        fetch(`${base}/upload-avatar`, {\r\n            method: 'POST',\r\n            mode: 'cors',\r\n            cache: 'no-cache',\r\n            credentials: 'same-origin',\r\n            body: formData\r\n        }).then(\r\n            response => response.json() // if the response is a JSON object\r\n        ).then(\r\n            success => console.log(success) // Handle the success response object\r\n        ).catch(\r\n            error => console.log(error) // Handle the error response object\r\n        );\r\n    }\r\n}\r\n\r\n\r\nlet r = () => {\r\n    return Math.random() * 250 - 125;\r\n}\r\n\r\nconst getAvatars = async () => {\r\n    let promise = new Promise((resolve, reject) => {\r\n        fetch(`${base}/avatars`).then(\r\n            response => response.json() // if the response is a JSON object\r\n        ).then(\r\n            success => resolve(success)\r\n        )\r\n    })\r\n    return promise;\r\n};\r\n\r\n\r\n\r\nconst addSphere = async (src) => {\r\n    return new Promise((resolve) => {\r\n        g.loader.load(\r\n            src,\r\n            function (texture) {\r\n                const material = new THREE.MeshBasicMaterial({\r\n                    map: texture\r\n                });\r\n                let sphere = new THREE.Mesh(g.geometry, material);\r\n                resolve(sphere);\r\n            },\r\n            undefined,\r\n            function (err) {\r\n                console.error('An error happened.');\r\n            }\r\n        );\r\n    })\r\n}\r\n\r\nconst rDegree = () => {\r\n    return Math.random() * 360 - 180;\r\n}\r\n\r\nconst addSpheres = (data) => {\r\n    console.log(data);\r\n    // let material = new THREE.MeshBasicMaterial();\r\n\r\n    data.forEach(src => {\r\n        src = src.substring(1);\r\n        addSphere(src).then(sphere => {\r\n            let position = new THREE.Vector3();\r\n            let radius = Math.random() * 250 + 125;\r\n            let container = new THREE.Group();\r\n            container.add(sphere);\r\n            let tinyDegree = () => {\r\n                let max = 0.2;\r\n                let r = Math.random() * max;\r\n                return r - max / 2;\r\n            }\r\n            container.rotation.set(rDegree(), tinyDegree(), rDegree() / 80);\r\n            sphere.position.set(0, 0, radius);\r\n            // container.position.set(r(), r(), r())\r\n            // container.rotation.x = Math.random() * Math.PI / 2;\r\n\r\n            g.spheres.push({\r\n                container: container,\r\n                speed: Math.random() * 5 + 0.25,\r\n                xStart: Math.random() * Math.PI * 2\r\n            });\r\n            g.scene.add(container);\r\n        });\r\n\r\n\r\n    })\r\n}\r\n\r\nconst initSun = () => {\r\n    let sunTexture;\r\n    let count = 0;\r\n    let xAmount = 3;\r\n    let yAmount = 2;\r\n\r\n    function spriteAnimate() {\r\n        let xOffs = count % xAmount / xAmount;\r\n        let yOffs = Math.floor(count / xAmount) % yAmount / yAmount;\r\n        sunTexture.offset.set(xOffs, yOffs);\r\n        count++;\r\n        setTimeout(spriteAnimate, 250);\r\n    }\r\n\r\n    g.loader.load(\r\n        \"./sun/sprite.png\",\r\n        function (texture) {\r\n            sunTexture = texture;\r\n            const material = new THREE.MeshBasicMaterial({\r\n                map: sunTexture,\r\n                side: THREE.DoubleSide\r\n            });\r\n            sunTexture.repeat.set(0.33333, 0.5);\r\n\r\n            let sphere = new THREE.Mesh(g.geometry, material);\r\n\r\n            g.sun = sphere;\r\n            g.sun.scale.set(100, 100, 100);\r\n            g.scene.add(sphere);\r\n            spriteAnimate();\r\n            // resolve(sphere);\r\n        },\r\n        undefined,\r\n        function (err) {\r\n            console.error('An error happened.');\r\n        }\r\n    );\r\n\r\n\r\n\r\n}\r\n\r\nconst initThree = () => {\r\n    const renderer = new THREE.WebGLRenderer({ antialias: true });\r\n    renderer.setPixelRatio(window.devicePixelRatio);\r\n    renderer.setSize(window.innerWidth, window.innerHeight);\r\n    // renderer.outputEncoding = THREE.sRGBEncoding;\r\n    renderer.domElement.id = \"threejs\";\r\n\r\n    document.body.appendChild(renderer.domElement);\r\n    g.scene = new THREE.Scene();\r\n    // scene.background = new THREE.Color(0xbfe3dd);\r\n\r\n    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);\r\n    camera.position.set(0, 0, -100);\r\n    const controller = new THREE.OrbitControls(camera, renderer.domElement);\r\n\r\n    initSun();\r\n\r\n\r\n    function onResize() {\r\n        camera.aspect = window.innerWidth / window.innerHeight;\r\n        camera.updateProjectionMatrix();\r\n        renderer.setSize(window.innerWidth, window.innerHeight);\r\n    }\r\n\r\n    window.addEventListener('resize', onResize, false);\r\n\r\n    // sphere.position.set({ x: 0, y: 0, z: 0 });\r\n    var lastTime;\r\n    const animate = (now) => {\r\n        requestAnimationFrame(animate);\r\n        if (!lastTime) { lastTime = now; return }\r\n        var delta = lastTime - now;\r\n\r\n        delta = delta / 10000000;\r\n        camera.rotation.X = Math.sin(now);\r\n        controller.update();\r\n        g.spheres.forEach(sphere => {\r\n            sphere.container.rotation.x = sphere.xStart + Math.sin(now / 100000 * sphere.speed) * Math.PI * 2;\r\n        })\r\n        /*         if (g.sun) {\r\n                    g.sun.rotation.x += delta / 2;\r\n                } */\r\n        // lastTime = now;\r\n        renderer.render(g.scene, camera);\r\n    }\r\n    animate();\r\n}\r\n\r\nconst updateSun = () => {\r\n    fetch(`${base}/update-sun`)\r\n        .then(() => { });\r\n}\r\n\r\nconst init = () => {\r\n    initThree()\r\n    getAvatars().then(\r\n        res => { console.log(res); addSpheres(res.files); }\r\n    )\r\n    updateSun();\r\n}\r\ninit();\r\n\r\n\r\n\n\n//# sourceURL=webpack://sunstream/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;